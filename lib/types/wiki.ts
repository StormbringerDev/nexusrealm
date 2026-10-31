export interface World {
  id: string; // UUIDv4
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  description?: string;
}

export interface WorldFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
}
