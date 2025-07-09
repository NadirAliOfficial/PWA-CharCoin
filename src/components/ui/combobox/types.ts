export interface AxiosRequestProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  headers?: any;
}

export type ComboboxItemBase = {
  label: string;
  value: string;
  disabled?: boolean;
};
