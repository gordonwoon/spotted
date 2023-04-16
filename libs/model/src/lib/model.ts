export function model(): string {
  return 'model';
}

export interface UserAction {
  selector: string;
  textContent?: string;
  route?: string;
}
