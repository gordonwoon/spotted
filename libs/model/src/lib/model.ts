export function model(): string {
  return 'model';
}

export interface UserAction {
  type: string;
  selector: string;
  textContent?: string;
  route?: string;
  scrollY?: number;
}
