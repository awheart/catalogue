const encrypt = require('../../src/api/utils/encryption')

exports.insertIntoDB = [
    {
        username: 'user1',
        email: 'user1@example.com',
        birth_date: '1989-05-13',
        icone: 'icone-user1',
        role_id: 1,
        password: encrypt.password('password'),
    },
    {
        username: 'user2',
        email: 'user2@example.com',
        birth_date: '1996-05-13',
        icone: 'icone-user2',
        role_id: 1,
        password: encrypt.password('password'),
    },
    {
        username: 'user3',
        email: 'user3@example.com',
        birth_date: '1972-05-13',
        icone: 'icone-user3',
        role_id: 1,
        password: encrypt.password('password'),
    },
    {
        username: 'user4',
        email: 'user4@example.com',
        birth_date: '1986-05-13',
        icone: 'icone-user4',
        role_id: 1,
        password: encrypt.password('password'),
    },
    {
        username: 'user5',
        email: 'user5@example.com',
        birth_date: '2000-05-13',
        icone: 'icone-user5',
        role_id: 1,
        password: encrypt.password('password'),
    }
]

exports.users = {
    GET: {
        all: {
            mocks: {},
            inputs: { url: '/api/users' },
            expects: {
                all: [{
                    birth_date: null,
                    created_at: expect.any(String),
                    description: null,
                    email: "admin@gmail.com",
                    icone: null,
                    id: 1,
                    password: expect.any(String),
                    role_id: 2,
                    updated_at: expect.any(String),
                    username: "admin",
                    liked_recipes: [],
                    comments: [],
                    recipes: [],
                    role: {
                        role_name: 'admin'
                    }
                },
                {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user1@example.com",
                    icone: "icone-user1",
                    id: 2,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user1",
                    comments: [],
                    liked_recipes: [],
                    recipes: [],
                    role: {
                        role_name: 'user'
                    }
                },
                {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user2@example.com",
                    icone: "icone-user2",
                    id: 3,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user2",
                    comments: [],
                    liked_recipes: [],
                    recipes: [],
                    role: {
                        role_name: 'user'
                    }
                },
                {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user3@example.com",
                    icone: "icone-user3",
                    id: 4,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user3",
                    comments: [],
                    liked_recipes: [],
                    recipes: [],
                    role: {
                        role_name: 'user'
                    }
                },
                {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user4@example.com",
                    icone: "icone-user4",
                    id: 5,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user4",
                    comments: [],
                    liked_recipes: [],
                    recipes: [],
                    role: {
                        role_name: 'user'
                    }
                },
                {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user5@example.com",
                    icone: "icone-user5",
                    id: 6,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user5",
                    comments: [],
                    liked_recipes: [],
                    recipes: [],
                    role: {
                        role_name: 'user'
                    }
                }]
            }
        },
        by_id: {
            mocks: {},
            inputs: { url: '/api/users/2' },
            expects: {
                by_id: {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user1@example.com",
                    icone: "icone-user1",
                    id: 2,
                    password: expect.any(String),
                    role_id: 1,
                    comments: [],
                    liked_recipes: [],
                    recipes: [],
                    updated_at: expect.any(String),
                    username: "user1",
                    role: {
                        role_name: 'user'
                    }
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
                    id: 2,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user1",
                    recipes: [],
                    liked_recipes: [],
                    comments: [],
                    role: {
                        role_name: 'user'
                    }
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
            inputs: { url: '/api/users/register', body: { email: 'userpost@gmail.com', password: 'password', username: 'userpost', icone: 'icone-new-user' } },
            expects: {
                one: {
                    email: 'userpost@gmail.com',
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    password: expect.any(String),
                    username: 'userpost',
                    icone: 'icone-new-user',
                    role_id: 1,
                    id: 7
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
                    username: 'user2'
                }
            },
            expects: {
                username_existing: {
                    errors: {
                        username: {
                            location: "body",
                            msg: "Ce nom d'utilisateur existe déjà.",
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
                url: '/api/users/4',
                body: {
                    password: 'password',
                    newPassword: 'newPassword',
                    passwordCheck: 'newPassword'
                }
            },
            expects: {
                update_user: {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    email: "user3@example.com",
                    icone: 'icone-user3',
                    id: 4,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    username: "user3",
                }
            }
        },
        update_failed: {
            mocks: {},
            inputs: {
                url: '/api/users/-1',
                body: {
                    password: 'password',
                    newPassword: 'newPassword',
                    passwordCheck: 'newPassword',
                    role: 'user'
                }
            },
            expects: {
                update_failed: {
                    errors: {
                        password: {
                            location: "body",
                            msg: "Utilisateur introuvable.",
                            param: "password",
                            value: "password",
                        }
                    }
                }
            }
        }
    },
    DELETE: {
        delete_user: {
            mocks: {},
            inputs: {
                url: '/api/users/2'
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
                    message: 'Utilisateur introuvable.'
                }
            }
        }
    }
}