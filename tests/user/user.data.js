exports.insertIntoDB = [
    {
        username: 'user1',
        // id: 1,
        email: 'user1@example.com',
        role: 'user',
        birth_date: '1989-05-13',
        icone: 'icone-user1',
        password: 'password',
    },
    {
        username: 'user2',
        // id: 2,
        email: 'user2@example.com',
        role: 'user',
        birth_date: '1996-05-13',
        icone: 'icone-user2',
        password: 'password',
    },
    {
        username: 'user3',
        email: 'user3@example.com',
        role: 'user',
        birth_date: '1972-05-13',
        // id: 3,
        icone: 'icone-user3',
        password: 'password',
    },
    {
        username: 'user4',
        email: 'user4@example.com',
        role: 'user',
        birth_date: '1986-05-13',
        // id: 4,
        icone: 'icone-user4',
        password: 'password',
    },
    {
        username: 'user5',
        email: 'user5@example.com',
        role: 'user',
        birth_date: '2000-05-13',
        // id: 5,
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
                    "birth_date": expect.any(String),
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
                    "birth_date": expect.any(String),
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
                    "birth_date": expect.any(String),
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
                    "birth_date": expect.any(String),
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
                    "birth_date": expect.any(String),
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
        },
        by_id: {
            mocks: {},
            inputs: { url: '/api/users/1' },
            expects: {
                by_id: {
                    "birth_date": expect.any(String),
                    "created_at": expect.any(String),
                    "description": null,
                    "email": "user1@example.com",
                    "icone": "icone-user1",
                    "id": 1,
                    "password": "password",
                    "role": "user",
                    "updated_at": expect.any(String),
                    "username": "user1"
                }
            }
        },
        by_filter: {
            mocks: {},
            inputs: {
                url: '/api/users?email=user1@example.com'
            },
            expects: {
                by_filter: [{
                    birth_date: expect.any(String), 
                    created_at: expect.any(String), 
                    description: null, 
                    email: "user1@example.com",
                    icone: "icone-user1", 
                    id: 1, 
                    password: "password", 
                    role: "user", 
                    updated_at: expect.any(String), 
                    username: "user1"
                }]
            }
        },
        invalid_id: {
            mocks: {},
            inputs: {
                url: '/api/users/-1'
            },
            expects: {
                invalid_id: {
                    message: "L'id de cet utilisateur est invalide."
                }
            }
        }
    },
    POST: {
        one: {
            mock: {},
            inputs: { url: '/api/users/register', body: { email: 'userpost@gmail.com', password: 'password', username: 'userpost', role: 'test' } },
            expects: {
                one: {
                    email: 'userpost@gmail.com',
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    password: expect.any(String),
                    username: 'userpost',
                    role: 'user',
                    id: 6
                }
            }
        },
        invalid_email: {
            mock: {},
            inputs: { url: '/api/users/register', body: { email: 'userpostàgmail.com', password: 'password', username: 'userpost2', role: 'test' } },
            expects: {
                invalid_email: {
                    errors: {
                        email: {
                            location: "body",
                            msg: "Veuillez entrer une adresse email valide",
                            param: "email",
                            value: "userpostàgmail.com",
                        },
                    }
                }
            }
        },
        username_existing: {
            mock: {},
            inputs: {
                url: '/api/users/register',
                body: {
                    email: 'userexisting@gmail.com',
                    password: 'password',
                    username: 'user2',
                    role: 'test'
                }
            },
            expects: {
                username_existing: {
                    errors: {
                        username: {
                            location: "body",
                            msg: "Ce nom d'utilisateur existe déjà",
                            param: "username",
                            value: "user2",
                        },
                    }
                }
            }
        }
    },
    PATCH: {
        update_user: {
            mocks: {},
            inputs: {
                url: '/api/users/1',
                body: {
                    password: 'newpassword'
                }
            },
            expects: {
                update_user: {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user1@example.com",
                    icone: "icone-user1",
                    id: 1,
                    password: expect.any(String),
                    role: "user",
                    updated_at: expect.any(String),
                    username: "user1",
                }
            }
        },
        update_failed: {
            mocks: {},
            inputs: {
                url: '/api/users/-1',
                body: {
                    password: 'newpassword'
                }
            },
            expects: {
                update_failed: {
                    message: 'Utilisateur introuvable'
                }
            }
        }
    },
    DELETE: {
        delete_user: {
            mocks: {},
            inputs: {
                url: '/api/users/1'
            },
            expects: {
                delete_user: 'L\'utilisateur a bien été supprimé'
            }
        },
        delete_failed: {
            mocks: {},
            inputs: {
                url: '/api/users/-1'
            },
            expects: {
                delete_failed: {
                    message: 'Utilisateur introuvable'
                }
            }
        }
    }
}