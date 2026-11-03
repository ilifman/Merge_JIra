import { useState } from 'react';

// ============================================================
// DATA & CONSTANTS
// ============================================================

const STATUS_TO_POSSIBLE_COLUMNS: Record<string, string[]> = {
  'Сделать': ['ВЦ ожид в потоке'],
  'Выполняется': ['ВЦ в работе'],
  'Ассесмент': ['ВЦ ассесмент'],
  'Код-ревью': ['ВЦ код-ревью'],
  'Готово к тестированию': ['ВЦ ждет тест дэв', 'ВЦ ждет тест DEV'],
  'Тестирование': ['ВЦ тест дэв', 'ВЦ тест DEV'],
  'Кандидат в Staging': ['ВЦ кандидат тест стэйдж', 'ВЦ кандидат Stage'],
  'Тестирование Staging': ['ВЦ тест стэйдж', 'ВЦ тест Stage'],
  'Готово к релизу': ['ВЦ ждет релиз', 'ВЦ ожид релиза'],
  'Готово': ['Готово'],
};

const WORKFLOW_STEPS = [
  { id: 1, title: 'Read Jira Export', desc: 'Parse render.xlsx → extract status changes', icon: '📥' },
  { id: 2, title: 'Select Target Sheet', desc: 'Interactive sheet selection from PB в цифрах.xlsx', icon: '📋' },
  { id: 3, title: 'Build Column Mapping', desc: 'Match Jira statuses → target sheet columns', icon: '🔗' },
  { id: 4, title: 'Validate Data', desc: 'Cross-check actual status vs history transitions', icon: '✅' },
  { id: 5, title: 'Pre-flight Checks', desc: 'Verify file exists, not locked, path OK', icon: '🛡️' },
  { id: 6, title: 'Excel COM Automation', desc: 'Open workbook, update cells with dates', icon: '⚙️' },
  { id: 7, title: 'Save & Close', desc: 'Single save at end, cleanup COM objects', icon: '💾' },
];

const MOCK_UPDATES = [
  { row: 3, key: 'EDO1C-101', header: 'ВЦ в работе', date: '15.01.2025', action: 'NEW', color: 'green' },
  { row: 5, key: 'EDO1C-102', header: 'ВЦ ассесмент', date: '22.01.2025', action: 'already exist', color: 'gray' },
  { row: 8, key: 'EDO1C-105', header: 'ВЦ код-ревью', date: '10.02.2025', action: 'UPDATED (earlier)', color: 'green' },
  { row: 12, key: 'EDO1C-108', header: 'ВЦ ждет тест DEV', date: '01.03.2025', action: 'UPDATED (later)', color: 'red' },
  { row: 15, key: 'EDO1C-112', header: 'ВЦ тест Stage', date: '05.03.2025', action: 'NEW', color: 'green' },
  { row: 18, key: 'EDO1C-115', header: 'Готово', date: '12.03.2025', action: 'UPDATED (earlier)', color: 'green' },
  { row: 20, key: 'EDO1C-118', header: 'ВЦ ожид в потоке', date: '18.03.2025', action: 'Skipped (protected)', color: 'yellow' },
  { row: 22, key: 'EDO1C-120', header: 'ВЦ в работе', date: '20.03.2025', action: 'Skipped (threaded)', color: 'orange' },
];

// ============================================================
// COMPONENTS
// ============================================================

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-6 px-8 shadow-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/30">
            📊
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Excel COM Automation Script</h1>
            <p className="text-slate-400 text-sm mt-0.5">Hardened v4.0 — Final Version • Dashboard v2.4</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium border border-emerald-500/30">
            ● Production Ready
          </span>
          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
            Windows Only
          </span>
        </div>
      </div>
    </header>
  );
}

function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">⚡</span>
        Processing Workflow
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {WORKFLOW_STEPS.map((step, idx) => (
          <div key={step.id} className="relative">
            <div
              className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer h-full ${
                activeStep === step.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="text-2xl mb-2">{step.icon}</div>
              <div className="text-xs font-bold text-slate-500 mb-1">Step {step.id}</div>
              <div className="text-sm font-semibold text-slate-800 leading-tight">{step.title}</div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">{step.desc}</div>
            </div>
            {idx < WORKFLOW_STEPS.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-1 transform -translate-y-1/2 text-slate-300 z-10">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusMappingSection() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">🔗</span>
        Dynamic Column Mapping
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Jira Status</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Possible Target Columns</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-600">Priority</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(STATUS_TO_POSSIBLE_COLUMNS).map(([status, cols], idx) => (
                <tr key={status} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-xs">
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {cols.map((col, i) => (
                        <span
                          key={col}
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono ${
                            i === 0
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {i === 0 && <span className="mr-1">★</span>}
                          {col}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-slate-400">
                      {cols.length === 1 ? '1 variant' : `${cols.length} variants`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
        <span className="text-emerald-500">★</span> First match wins — columns are tried in order
      </p>
    </section>
  );
}

function ColorCodingSection() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">🎨</span>
        Cell Color Coding Logic
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Green */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#D9EAD3' }} />
            <div>
              <div className="font-bold text-emerald-800">Green — #D9EAD3</div>
              <div className="text-xs text-emerald-600">Google Sheets Light Green 3</div>
            </div>
          </div>
          <ul className="text-sm text-emerald-700 space-y-1.5">
            <li className="flex items-start gap-2"><span>•</span> New cell (was empty)</li>
            <li className="flex items-start gap-2"><span>•</span> Jira date <strong>earlier</strong> than existing</li>
          </ul>
          <div className="mt-3 text-xs text-emerald-600 bg-emerald-100 rounded-lg px-3 py-2">
            COM Color: <code>13888217</code> (R + G×256 + B×65536)
          </div>
        </div>

        {/* Red */}
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: '#F4CCCC' }} />
            <div>
              <div className="font-bold text-red-800">Red — #F4CCCC</div>
              <div className="text-xs text-red-600">Google Sheets Light Red 3</div>
            </div>
          </div>
          <ul className="text-sm text-red-700 space-y-1.5">
            <li className="flex items-start gap-2"><span>•</span> Jira date <strong>later</strong> than existing</li>
            <li className="flex items-start gap-2"><span>•</span> Indicates potential delay</li>
          </ul>
          <div className="mt-3 text-xs text-red-600 bg-red-100 rounded-lg px-3 py-2">
            COM Color: <code>13487284</code> (R + G×256 + B×65536)
          </div>
        </div>

        {/* No Change */}
        <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-300" />
            <div>
              <div className="font-bold text-slate-700">No Change</div>
              <div className="text-xs text-slate-500">Date already matches</div>
            </div>
          </div>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li className="flex items-start gap-2"><span>•</span> Existing date = Jira date</li>
            <li className="flex items-start gap-2"><span>•</span> Cell skipped (no write)</li>
          </ul>
          <div className="mt-3 text-xs text-slate-500 bg-slate-100 rounded-lg px-3 py-2">
            Alignment: right-aligned (XL_RIGHT = -4152)
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoOutputSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleUpdates = showAll ? MOCK_UPDATES : MOCK_UPDATES.slice(0, 5);

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">📝</span>
        Simulated Processing Output
      </h2>
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-400 ml-2 font-mono">console output</span>
        </div>
        <div className="p-4 font-mono text-xs overflow-x-auto">
          <div className="text-slate-400 mb-2">Row, Issue Key, Column Header, Value, Action</div>
          <div className="text-slate-600 mb-3">{'─'.repeat(80)}</div>
          {visibleUpdates.map((upd, idx) => (
            <div key={idx} className="flex items-center gap-2 py-0.5">
              <span className="text-slate-500 w-8 text-right">{upd.row}</span>
              <span className="text-slate-400">,</span>
              <span className="text-blue-400">{upd.key}</span>
              <span className="text-slate-400">,</span>
              <span className="text-slate-300">{upd.header}</span>
              <span className="text-slate-400">,</span>
              <span className="text-white">{upd.date}</span>
              <span className="text-slate-400">,</span>
              <span
                className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                  upd.color === 'green'
                    ? 'bg-emerald-900/50 text-emerald-300'
                    : upd.color === 'red'
                    ? 'bg-red-900/50 text-red-300'
                    : upd.color === 'yellow'
                    ? 'bg-yellow-900/50 text-yellow-300'
                    : upd.color === 'orange'
                    ? 'bg-orange-900/50 text-orange-300'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                [{upd.action}]
              </span>
            </div>
          ))}
          <div className="text-slate-600 mt-3 mb-2">{'─'.repeat(80)}</div>
          <div className="text-slate-400">
            <div>Summary:</div>
            <div className="ml-2">New cells written:              <span className="text-emerald-400">2</span></div>
            <div className="ml-2">Already exist (skipped):        <span className="text-slate-300">1</span></div>
            <div className="ml-2">Updated (Jira earlier, green):  <span className="text-emerald-400">2</span></div>
            <div className="ml-2">Updated (Jira later, red):      <span className="text-red-400">1</span></div>
            <div className="ml-2">Skipped (protected):            <span className="text-yellow-400">1</span></div>
            <div className="ml-2">Skipped (threaded comment):     <span className="text-orange-400">1</span></div>
          </div>
        </div>
      </div>
      {MOCK_UPDATES.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {showAll ? 'Show less ↑' : `Show all ${MOCK_UPDATES.length} rows ↓`}
        </button>
      )}
    </section>
  );
}

function SafetyFeaturesSection() {
  const features = [
    {
      icon: '🛡️',
      title: 'Pre-flight Checks',
      items: ['File existence verification', 'File lock detection', 'Path length validation', 'Zone.Identifier check'],
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      items: ['Events disabled (EnableEvents=False)', 'Screen updating off', 'Auto-calculation disabled', 'Single save at end'],
    },
    {
      icon: '🔒',
      title: 'Crash Protection',
      items: ['RPC server monitoring', 'Excel alive checks', 'Graceful COM cleanup', 'Ghost process killer'],
    },
    {
      icon: '🔄',
      title: 'Data Integrity',
      items: ['Cell deduplication', 'Threaded comment skip', 'Protected cell detection', 'Formula preservation'],
    },
  ];

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">🛡️</span>
        Safety & Hardening Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">{feature.icon}</div>
            <h3 className="font-bold text-slate-800 mb-3">{feature.title}</h3>
            <ul className="space-y-1.5">
              {feature.items.map((item) => (
                <li key={item} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConfigurationSection() {
  const [jiraFile, setJiraFile] = useState('render.xlsx');
  const [targetFile, setTargetFile] = useState('PB в цифрах.xlsx');
  const [copied, setCopied] = useState(false);

  const configCode = `# File paths
jira_file = '${jiraFile}'
target_file = '${targetFile}'

# Debug mode (leave empty for normal run)
DEBUG_TASKS = set()

# Excel COM settings
excel.Visible = False
excel.DisplayAlerts = False
excel.AutomationSecurity = 3  # msoAutomationSecurityForceDisable
excel.EnableEvents = False
excel.ScreenUpdating = False
excel.Calculation = -4135  # xlCalculationManual

# Workbook open parameters
wb = excel.Workbooks.Open(
    abs_path,
    UpdateLinks=0,
    ReadOnly=False,
    IgnoreReadOnlyRecommended=True,
    Notify=False,
    AddToMru=False
)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">⚙️</span>
        Configuration
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Jira Export File</label>
            <input
              type="text"
              value={jiraFile}
              onChange={(e) => setJiraFile(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="render.xlsx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Excel File</label>
            <input
              type="text"
              value={targetFile}
              onChange={(e) => setTargetFile(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="PB в цифрах.xlsx"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">⚠️ Requirements</h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Windows OS with Microsoft Excel installed</li>
              <li>• Python 3.8+ with pywin32, pandas, numpy</li>
              <li>• Both Excel files must be in the same directory</li>
              <li>• Close all Excel windows before running</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">📦 Dependencies</h4>
            <div className="flex flex-wrap gap-1.5">
              {['pandas', 'numpy', 'pywin32', 'openpyxl'].map((pkg) => (
                <code key={pkg} className="px-2 py-0.5 bg-slate-200 rounded text-xs text-slate-700 font-mono">
                  {pkg}
                </code>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="relative">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-t-lg border border-slate-700">
              <span className="text-xs text-slate-400 font-mono">config.py</span>
              <button
                onClick={handleCopy}
                className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-slate-900 border border-t-0 border-slate-700 rounded-b-lg p-4 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">
              {configCode}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">🏗️</span>
        Architecture Overview
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Input */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-3">
              📊
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Input Layer</h3>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="bg-blue-50 rounded-lg px-3 py-1.5 inline-block">render.xlsx</div>
              <div className="text-slate-400">↓ pandas.read_excel()</div>
              <div className="bg-blue-50 rounded-lg px-3 py-1.5 inline-block">PB в цифрах.xlsx</div>
            </div>
          </div>

          {/* Processing */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-3">
              🧠
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Processing Layer</h3>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="bg-purple-50 rounded-lg px-3 py-1.5 inline-block">Status Cleaning</div>
              <div className="text-slate-400">↓</div>
              <div className="bg-purple-50 rounded-lg px-3 py-1.5 inline-block">Dynamic Mapping</div>
              <div className="text-slate-400">↓</div>
              <div className="bg-purple-50 rounded-lg px-3 py-1.5 inline-block">Date Extraction</div>
            </div>
          </div>

          {/* Output */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-3">
              📝
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Output Layer</h3>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="bg-emerald-50 rounded-lg px-3 py-1.5 inline-block">win32com.client</div>
              <div className="text-slate-400">↓</div>
              <div className="bg-emerald-50 rounded-lg px-3 py-1.5 inline-block">Cell Updates</div>
              <div className="text-slate-400">↓</div>
              <div className="bg-emerald-50 rounded-lg px-3 py-1.5 inline-block">wb.Save()</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Functions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { name: 'extract_jira_key()', desc: 'Parse Jira key from URL/text' },
              { name: 'clean_status()', desc: 'Remove Jira export artifacts' },
              { name: 'build_dynamic_mapping()', desc: 'Match statuses to columns' },
              { name: 'parse_cell_date()', desc: 'Multi-format date parsing' },
              { name: 'has_threaded_comment()', desc: 'Detect Excel 365 comments' },
              { name: 'is_excel_alive()', desc: 'COM connection health check' },
              { name: 'preflight_checks()', desc: 'File & environment validation' },
              { name: 'excel_rgb()', desc: 'Hex → COM color conversion' },
            ].map((fn) => (
              <div key={fn.name} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                <code className="text-xs font-mono text-indigo-600 font-semibold">{fn.name}</code>
                <span className="text-xs text-slate-500">— {fn.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 px-8 bg-slate-50 border-t border-slate-200 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          Excel COM Automation Script v4.0 • Dashboard v2.4 • Windows + Python
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>BGR Color Model</span>
          <span>•</span>
          <span>COM Automation</span>
          <span>•</span>
          <span>Deduplication</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WorkflowSection />
        <ArchitectureSection />
        <StatusMappingSection />
        <ColorCodingSection />
        <SafetyFeaturesSection />
        <DemoOutputSection />
        <ConfigurationSection />
      </main>
      <Footer />
    </div>
  );
}
