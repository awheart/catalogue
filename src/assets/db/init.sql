#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: tag_ingredient
#------------------------------------------------------------

CREATE TABLE tag_ingredient(
        id   Int  Auto_increment  NOT NULL ,
        name Varchar (50) NOT NULL
	,CONSTRAINT tag_ingredient_AK UNIQUE (name)
	,CONSTRAINT tag_ingredient_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id         Int  Auto_increment  NOT NULL ,
        password   Varchar (15) NOT NULL ,
        created_at Date NOT NULL ,
        updated_at Date NOT NULL ,
        icone      Varchar (50) NOT NULL ,
        age        Varchar (50) NOT NULL ,
        biography  Varchar (50) NOT NULL ,
        name       Varchar (50) NOT NULL ,
        email      Varchar (50) NOT NULL
	,CONSTRAINT user_AK UNIQUE (name,email)
	,CONSTRAINT user_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: recipe
#------------------------------------------------------------

CREATE TABLE recipe(
        id           Int  Auto_increment  NOT NULL ,
        image        Varchar (250) NOT NULL ,
        prep_time    Int NOT NULL ,
        cook_time    Int NOT NULL ,
        nbr_person   Int NOT NULL ,
        created_at   Date NOT NULL ,
        updated_at   Date NOT NULL ,
        is_published Bool NOT NULL ,
        price        Varchar (50) NOT NULL ,
        description  Varchar (50) NOT NULL ,
        name         Varchar (100) NOT NULL ,
        id_user      Int NOT NULL
	,CONSTRAINT recipe_AK UNIQUE (name)
	,CONSTRAINT recipe_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: step
#------------------------------------------------------------

CREATE TABLE step(
        id         Int  Auto_increment  NOT NULL ,
        content    Text NOT NULL ,
        step_order Int NOT NULL ,
        id_recipe  Int NOT NULL
	,CONSTRAINT step_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: month_of_consumption
#------------------------------------------------------------

CREATE TABLE month_of_consumption(
        id    Int  Auto_increment  NOT NULL ,
        month Varchar (50)
	,CONSTRAINT month_of_consumption_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: list_ingredient
#------------------------------------------------------------

CREATE TABLE list_ingredient(
        id           Int  Auto_increment  NOT NULL ,
        content      Varchar (50) NOT NULL ,
        inlist_order Int NOT NULL ,
        id_recipe    Int NOT NULL
	,CONSTRAINT list_ingredient_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ingredient_recipe
#------------------------------------------------------------

CREATE TABLE ingredient_recipe(
        id        Int NOT NULL ,
        id_recipe Int NOT NULL
	,CONSTRAINT ingredient_recipe_PK PRIMARY KEY (id,id_recipe)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: month_of_consumption_recipe
#------------------------------------------------------------

CREATE TABLE month_of_consumption_recipe(
        id        Int NOT NULL ,
        id_recipe Int NOT NULL
	,CONSTRAINT month_of_consumption_recipe_PK PRIMARY KEY (id,id_recipe)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: like_recipe
#------------------------------------------------------------

CREATE TABLE like_recipe(
        id        Int NOT NULL ,
        id_recipe Int NOT NULL
	,CONSTRAINT like_recipe_PK PRIMARY KEY (id,id_recipe)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Comment_recipe
#------------------------------------------------------------

CREATE TABLE Comment_recipe(
        id                Int  Auto_increment  NOT NULL ,
        content           Text NOT NULL ,
        created_at        Date NOT NULL ,
        id_recipe         Int NOT NULL ,
        id_user           Int NOT NULL ,
        id_Comment_recipe Int
	,CONSTRAINT Comment_recipe_PK PRIMARY KEY (id)
)ENGINE=InnoDB;




ALTER TABLE recipe
	ADD CONSTRAINT recipe_user0_FK
	FOREIGN KEY (id_user)
	REFERENCES user(id);

ALTER TABLE step
	ADD CONSTRAINT step_recipe0_FK
	FOREIGN KEY (id_recipe)
	REFERENCES recipe(id);

ALTER TABLE list_ingredient
	ADD CONSTRAINT list_ingredient_recipe0_FK
	FOREIGN KEY (id_recipe)
	REFERENCES recipe(id);

ALTER TABLE ingredient_recipe
	ADD CONSTRAINT ingredient_recipe_tag_ingredient0_FK
	FOREIGN KEY (id)
	REFERENCES tag_ingredient(id);

ALTER TABLE ingredient_recipe
	ADD CONSTRAINT ingredient_recipe_recipe1_FK
	FOREIGN KEY (id_recipe)
	REFERENCES recipe(id);

ALTER TABLE month_of_consumption_recipe
	ADD CONSTRAINT month_of_consumption_recipe_month_of_consumption0_FK
	FOREIGN KEY (id)
	REFERENCES month_of_consumption(id);

ALTER TABLE month_of_consumption_recipe
	ADD CONSTRAINT month_of_consumption_recipe_recipe1_FK
	FOREIGN KEY (id_recipe)
	REFERENCES recipe(id);

ALTER TABLE like_recipe
	ADD CONSTRAINT like_recipe_user0_FK
	FOREIGN KEY (id)
	REFERENCES user(id);

ALTER TABLE like_recipe
	ADD CONSTRAINT like_recipe_recipe1_FK
	FOREIGN KEY (id_recipe)
	REFERENCES recipe(id);

ALTER TABLE Comment_recipe
	ADD CONSTRAINT Comment_recipe_recipe0_FK
	FOREIGN KEY (id_recipe)
	REFERENCES recipe(id);

ALTER TABLE Comment_recipe
	ADD CONSTRAINT Comment_recipe_user1_FK
	FOREIGN KEY (id_user)
	REFERENCES user(id);

ALTER TABLE Comment_recipe
	ADD CONSTRAINT Comment_recipe_Comment_recipe2_FK
	FOREIGN KEY (id_Comment_recipe)
	REFERENCES Comment_recipe(id);
