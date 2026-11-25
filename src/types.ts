export interface GitCommand {
  platform: string;
  cmd: string;
  note?: string;
}

export interface GuideStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  commands: GitCommand[];
  verify: string;
  verifyOutput: string;
}

export interface QuickCommand {
  desc: string;
  cmd: string;
}

export interface Tip {
  title: string;
  desc: string;
  icon: string;
}
