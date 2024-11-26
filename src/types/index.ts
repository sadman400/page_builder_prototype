export interface Block {
  id: string;
  type: 'text' | 'image' | 'button';
  content: string;
  url?: string;
}

export interface Column {
  id: string;
  blocks: Block[];
}

export interface Row {
  id: string;
  columns: Column[];
}

export interface Tool {
  icon: any;
  label: string;
  type: Block['type'];
}
