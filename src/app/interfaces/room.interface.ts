export interface Room {
  id: number;
  hotelId: number;
  cost: number;
  taxes: number;
  type: 'single' | 'double' | 'multiple' | 'shared';
  description: string;
}
