import { Driver } from '@/features/tempTable/columns';
import person from '@/assets/images/person.jpg';
import sea from '@/assets/images/sea.jpg';

export const data: Driver[] = [
  {
    id: '0001',
    name: 'John Doe',
    email: 'john@test.com',
    phoneNumber: '0123456789',
    taxiNumberPlate: 'AB20 CDE',
    avatar: person,
    image: sea,
  },
  {
    id: '0002',
    name: 'Jane Doe',
    email: 'jane@test.com',
    phoneNumber: '0123456789',
    taxiNumberPlate: 'AB21 CDE',
    avatar: person,
    image: sea,
  },
  {
    id: '0003',
    name: 'Mary Wilson',
    email: 'mary@test.com',
    phoneNumber: '0123456789',
    taxiNumberPlate: 'AB22 CDE',
    avatar: person,
    image: sea,
  },
  {
    id: '0004',
    name: 'Fred Wilson',
    email: 'fred@test.com',
    phoneNumber: '0123456789',
    taxiNumberPlate: 'AB23 CDE',
    avatar: person,
    image: sea,
  },
];
