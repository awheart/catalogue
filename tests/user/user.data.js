exports.insertIntoDB = [
    {
        username: 'user1',
        id: 1,
        email: 'user1@example.com',
        role: 'user',
        icone: 'icone-user1',
        password: 'password',
    },
    {
        username: 'user2',
        id: 2,
        email: 'user2@example.com',
        role: 'user',
        icone: 'icone-user2',
        password: 'password',
    },
    {
        username: 'user3',
        email: 'user3@example.com',
        role: 'user',
        id: 3,
        icone: 'icone-user3',
        password: 'password',
    },
    {
        username: 'user4',
        email: 'user4@example.com',
        role: 'user',
        id: 4,
        icone: 'icone-user4',
        password: 'password',
    },
    {
        username: 'user5',
        email: 'user5@example.com',
        role: 'user',
        id: 5,
        icone: 'icone-user5',
        password: 'password',
    }
]

exports.users = {
    GET: {
        all: {
            mocks: {},
            inputs: { url: '/api/users' },
            expects: {
                all: [{
                    "birth_date": null,
                    "created_at": expect.any(String),
                    "description": null,
                    "email": "user1@example.com",
                    "icone": "icone-user1",
                    "id": 1,
                    "password": "password",
                    "role": "user",
                    "updated_at": expect.any(String),
                    "username": "user1",
                },
                {
                    "birth_date": null,
                    "created_at": expect.any(String),
                    "description": null,
                    "email": "user2@example.com",
                    "icone": "icone-user2",
                    "id": 2,
                    "password": "password",
                    "role": "user",
                    "updated_at": expect.any(String),
                    "username": "user2",
                },
                {
                    "birth_date": null,
                    "created_at": expect.any(String),
                    "description": null,
                    "email": "user3@example.com",
                    "icone": "icone-user3",
                    "id": 3,
                    "password": "password",
                    "role": "user",
                    "updated_at": expect.any(String),
                    "username": "user3",
                },
                {
                    "birth_date": null,
                    "created_at": expect.any(String),
                    "description": null,
                    "email": "user4@example.com",
                    "icone": "icone-user4",
                    "id": 4,
                    "password": "password",
                    "role": "user",
                    "updated_at": expect.any(String),
                    "username": "user4",
                },
                {
                    "birth_date": null,
                    "created_at": expect.any(String),
                    "description": null,
                    "email": "user5@example.com",
                    "icone": "icone-user5",
                    "id": 5,
                    "password": "password",
                    "role": "user",
                    "updated_at": expect.any(String),
                    "username": "user5",
                }]
            }
        }
    }
}