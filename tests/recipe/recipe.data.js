exports.insertIntoDB = [
    {
        title: 'recette1',
        description: 'recette description',
        user_id: 1,
        steps: [
            {
                content: 'étape 1',
                step_order: 1
            },
            {
                content: 'étape 2',
                step_order: 2
            }
        ],
        list_ingredient: [
            {
                content: 'ingredient 1',
                inlist_order: 1
            },
            {
                content: 'ingredient 2',
                inlist_order: 2
            }
        ]
    },
    {
        title: 'recette2',
        description: 'recette description',
        user_id: 1,
        steps: [
            {
                content: 'étape 1',
                step_order: 1
            },
            {
                content: 'étape 2',
                step_order: 2
            }
        ],
        list_ingredient: [
            {
                content: 'ingredient 1',
                inlist_order: 1
            },
            {
                content: 'ingredient 2',
                inlist_order: 2
            }
        ]
    },
    {
        title: 'recette3',
        description: 'recette description',
        user_id: 1,
        steps: [
            {
                content: 'étape 1',
                step_order: 1
            },
            {
                content: 'étape 2',
                step_order: 2
            }
        ],
        list_ingredient: [
            {
                content: 'ingredient 1',
                inlist_order: 1
            },
            {
                content: 'ingredient 2',
                inlist_order: 2
            }
        ]
    },
    {
        title: 'recette4',
        description: 'recette description',
        user_id: 3,
        steps: [
            {
                content: 'étape 1',
                step_order: 1
            },
            {
                content: 'étape 2',
                step_order: 2
            }
        ],
        list_ingredient: [
            {
                content: 'ingredient 1',
                inlist_order: 1
            },
            {
                content: 'ingredient 2',
                inlist_order: 2
            }
        ]
    },
    {
        title: 'recette5',
        description: 'recette description',
        user_id: 6,
        steps: [
            {
                content: 'étape 1',
                step_order: 1
            },
            {
                content: 'étape 2',
                step_order: 2
            }
        ],
        list_ingredient: [
            {
                content: 'ingredient 1',
                inlist_order: 1
            },
            {
                content: 'ingredient 2',
                inlist_order: 2
            }
        ]
    }
]

exports.recipes = {
    GET: {
        all: {
            mocks: {},
            inputs: { url: '/api/recipes' },
            expects: {
                all: [{},
                {},
                {},
                {},
                {}
                ]
            }
        },
        by_id: {
            mocks: {},
            inputs: { url: '/api/recipes/2' },
            expects: {
                by_id: {
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    icone: "icone-recipe1",
                    id: 2,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    title: "recipe1",
                    role: {
                        id: 1,
                        role_name: 'recipe'
                    }
                }
            }
        },
        by_filter: {
            mocks: {},
            inputs: {
                url: '/api/recipes?title=recipe1'
            },
            expects: {
                by_filter: [{
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    description: null,
                    icone: "icone-recipe1",
                    id: 2,
                    password: expect.any(String),
                    role_id: 1,
                    updated_at: expect.any(String),
                    title: "recipe1",
                    recipes: [],
                    comments: [],
                    role: {
                        id: 1,
                        role_name: 'recipe'
                    }
                }]
            }
        },
        invalid_id: {
            mocks: {},
            inputs: {
                url: '/api/recipes/-1'
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
            inputs: { url: '/api/recipes/register', body: { description: 'recipepost@gmail.com', password: 'password', title: 'recipepost', icone: 'icone-new-recipe' } },
            expects: {
                one: {
                    description: 'recipepost@gmail.com',
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    password: expect.any(String),
                    title: 'recipepost',
                    icone: 'icone-new-recipe',
                    role_id: 1,
                    id: 7
                }
            }
        },
        invalid_description: {
            mock: {},
            inputs: { url: '/api/recipes/register', body: { description: 'recipepostàgmail.com', password: 'password', title: 'recipepost2', role: 'test' } },
            expects: {
                invalid_description: {
                    errors: {
                        description: {
                            location: "body",
                            msg: "Veuillez entrer une adresse description valide",
                            param: "description",
                            value: "recipepostàgmail.com",
                        },
                    }
                }
            }
        },
        title_existing: {
            mock: {},
            inputs: {
                url: '/api/recipes/register',
                body: {
                    description: 'recipeexisting@gmail.com',
                    password: 'password',
                    title: 'recipe2'
                }
            },
            expects: {
                title_existing: {
                    errors: {
                        title: {
                            location: "body",
                            msg: "Ce nom d'utilisateur existe déjà",
                            param: "title",
                            value: "recipe2",
                        },
                    }
                }
            }
        }
    },
    PATCH: {
        update_recipe: {
            mocks: {},
            inputs: {
                url: '/api/recipes/4',
                body: {
                    id: 4,
                    title: 'recette4',
                    description: 'new description',
                    steps: [
                        {
                            content: 'étape 1',
                            step_order: 1
                        },
                        {
                            content: 'étape 2',
                            step_order: 2
                        }
                    ],
                    list_ingredient: [
                        {
                            content: 'ingredient 1',
                            inlist_order: 1
                        },
                        {
                            content: 'ingredient 2',
                            inlist_order: 2
                        }
                    ],
                    tags: [
                        {
                            id: 1
                        }
                    ],
                    nbr_person: 4,
                    cook_time: 2.5,
                    prep_time: 3.4
                }
            },
            expects: {
                update_recipe: {
                    title: 'recette4',
                    created_at: expect.any(String),
                    description: 'new description',
                    image: expect.any(String),
                    id: 4,
                    steps: [
                        {
                            id: expect.any(Number),
                            content: 'étape 1',
                            step_order: 1,
                            recipe_id: 4
                        },
                        {
                            id: expect.any(Number),
                            content: 'étape 2',
                            step_order: 2,
                            recipe_id: 4
                        }
                    ],
                    list_ingredient: [
                        {
                            id: expect.any(Number),
                            content: 'ingredient 1',
                            inlist_order: 1,
                            recipe_id: 4
                        },
                        {
                            id: expect.any(Number),
                            content: 'ingredient 2',
                            inlist_order: 2,
                            recipe_id: 4
                        }
                    ],
                    tags: [
                        {
                            tag_name: 'sel',
                            id: 1
                        }
                    ],
                    updated_at: expect.any(String),
                    is_published: false,
                    nbr_person: 4,
                    cook_time: 2.5,
                    prep_time: 3.4,
                    total_time: 5.9,
                    price_id: null,
                    user_id: 3
                }
            }
        },
        update_failed: {
            mocks: {},
            inputs: {
                url: '/api/recipes/-1',
                body: {
                    password: 'password',
                    newPassword: 'newPassword',
                    passwordCheck: 'newPassword',
                    role: 'recipe'
                }
            },
            expects: {
                update_failed: {
                    errors: {
                        password: {
                            location: "body",
                            msg: "Utilisateur introuvable",
                            param: "password",
                            value: "password",
                        }
                    }
                }
            }
        }
    },
    DELETE: {
        delete_recipe: {
            mocks: {},
            inputs: {
                url: '/api/recipes/2'
            },
            expects: {
                delete_recipe: 'recipe deleted'
            }
        },
        delete_failed: {
            mocks: {},
            inputs: {
                url: '/api/recipes/-1'
            },
            expects: {
                delete_failed: {
                    message: 'Recette introuvable.'
                }
            }
        }
    }
}