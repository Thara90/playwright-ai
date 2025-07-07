import { faker } from '@faker-js/faker';

function generateStrongPassword() {
  // At least 8 chars, upper, lower, number, special
  const upper = faker.string.alpha({ casing: 'upper', length: 2 });
  const lower = faker.string.alpha({ casing: 'lower', length: 3 });
  const number = faker.string.numeric(2);
  const special = faker.helpers.arrayElement(['@', '#', '$', '%', '&', '*', '!', '?']);
  // Shuffle and join
  const base = faker.helpers.shuffle([upper, lower, number, special]).join('');
  // Ensure at least 8 chars
  return base + faker.string.alpha({ length: Math.max(0, 8 - base.length) });
}

export function generateRegistrationData() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' }).toISOString().split('T')[0],
    street: faker.location.streetAddress(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: 'United States of America (the)', // adjust as needed
    phone: faker.string.numeric(10), // generates a 10-digit phone number
    email: faker.internet.email({ provider: 'example.com' }),
    password: generateStrongPassword()
  };
}
