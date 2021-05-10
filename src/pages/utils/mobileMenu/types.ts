export interface IMobileMenu {
  title: string;
  component: string;
  mode?: string;
  place: string;
  width?: number | string;
  data?: {};

  [key: string]: any;
}

export type IMobileMenuOpen = (arg: IMobileMenu) => void;
