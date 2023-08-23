// interface to define layout properties
export interface ILayout { 
  children?: React.ReactNode;
  dropdown?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  withHeader?: boolean;
}