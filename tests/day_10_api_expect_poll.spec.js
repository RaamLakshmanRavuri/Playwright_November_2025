import { test, expect } from '@playwright/test';

test('GET users - validate list', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  // Assertions
  await expect(response).toBeOK();
  expect(response.status()).toBe(200);

  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);

  expect(users[0]).toHaveProperty("id");
  expect(users[0]).toHaveProperty("name");
});


test.only('GET single user - validate fields', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);

  const user = await response.json();
  expect(user.id).toBe(1);
  expect(user.name).toBeTruthy();
  expect(user.email).toContain('@');
  console.log(user);
});


test('POST create user - validate 201', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: {
      name: 'Ram Automation',
      username: 'ram123',
      email: 'ram@test.com'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toHaveProperty("id");
  expect(body.name).toBe("Ram Automation");
});



test('PUT update user details', async ({ request }) => {
  const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
    data: {
      id: 1,
      name: "Updated User",
      username: "updated_user",
      email: "updated@test.com"
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe("Updated User");
});


test('PATCH update user email', async ({ request }) => {
  const response = await request.patch('https://jsonplaceholder.typicode.com/users/1', {
    data: {
      email: "patched@test.com"
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.email).toBe("patched@test.com");
});


test('DELETE user', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');
  expect(response.status()).toBe(200);
});


test.skip('Poll until API returns 200', async ({ request }) => {
  await expect.poll(async () => {
    const res = await request.get('https://jsonplaceholder.typicode.com/users');
    return res.status();
  }, {
    timeout: 10000,
    intervals: [500, 500, 1000, 2000]   // optional
  }).toBe(200);
});


