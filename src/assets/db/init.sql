
CREATE TABLE season(
        id   serial  NOT NULL ,
        name Varchar (50) NOT NULL
	,CONSTRAINT season_PK PRIMARY KEY (id)
);

CREATE TABLE ingredient(
        id       serial  NOT NULL ,
        name     Varchar (50) NOT NULL ,
        category Varchar (50) NOT NULL ,
        image    byteA NOT NULL,
        id_season Int NOT NULL
	,CONSTRAINT ingredient_PK PRIMARY KEY (id)
    ,CONSTRAINT ingredient_season_FK FOREIGN KEY (id_season) REFERENCES season(id)
);

CREATE TABLE users(
        id             serial  NOT NULL ,
        password       Varchar (50) NOT NULL ,
        created_at     TimeStamp NOT NULL ,
        updated_at     TimeStamp NOT NULL ,
        icone          byteA NOT NULL ,
        age            int NOT NULL,
        name           Varchar (50) NOT NULL ,
        email          Varchar (50) NOT NULL,
        role            Varchar (50) NOT NULL      
	,CONSTRAINT user_AK UNIQUE (name,email)
	,CONSTRAINT user_PK PRIMARY KEY (id)
);

CREATE TABLE recipe(
        id         serial  NOT NULL ,
        name       Varchar (50) NOT NULL ,
        image      byteA NOT NULL ,
        prep_time  Int NOT NULL ,
        cook_time  Int NOT NULL ,
        nbr_person Int NOT NULL ,
        created_at TimeStamp NOT NULL ,
        updated_at TimeStamp NOT NULL ,
        id_user    Int NOT NULL
	,CONSTRAINT recipe_PK PRIMARY KEY (id)

	,CONSTRAINT recipe_user_FK FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE Comment_recipe(
        id         serial  NOT NULL ,
        content    Text NOT NULL ,
        created_at TimeStamp NOT NULL ,
        id_ref     Int ,
        id_recipe  Int NOT NULL ,
        id_user    Int NOT NULL
	,CONSTRAINT Comment_recipe_PK PRIMARY KEY (id)

	,CONSTRAINT Comment_recipe_recipe_FK FOREIGN KEY (id_recipe) REFERENCES recipe(id)
	,CONSTRAINT Comment_recipe_user0_FK FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE comment_ingredient(
        id            serial  NOT NULL ,
        content       Text NOT NULL ,
        created_at    TimeStamp NOT NULL ,
        id_ref        Int ,
        id_ingredient Int NOT NULL ,
        id_user       Int NOT NULL
	,CONSTRAINT comment_ingredient_PK PRIMARY KEY (id)

	,CONSTRAINT comment_ingredient_ingredient_FK FOREIGN KEY (id_ingredient) REFERENCES ingredient(id)
	,CONSTRAINT comment_ingredient_user0_FK FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE step(
        id        serial  NOT NULL ,
        content   Text NOT NULL ,
        orderNumber     Int NOT NULL ,
        id_recipe Int NOT NULL
	,CONSTRAINT step_PK PRIMARY KEY (id)

	,CONSTRAINT step_recipe_FK FOREIGN KEY (id_recipe) REFERENCES recipe(id)
);

CREATE TABLE ingredient_recipe(
        id        Int NOT NULL ,
        id_recipe Int NOT NULL
	,CONSTRAINT ingredient_recipe_PK PRIMARY KEY (id,id_recipe)

	,CONSTRAINT ingredient_recipe_ingredient_FK FOREIGN KEY (id) REFERENCES ingredient(id)
	,CONSTRAINT ingredient_recipe_recipe0_FK FOREIGN KEY (id_recipe) REFERENCES recipe(id)
);