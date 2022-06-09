<template>
  <div class="home-bg">
    <NavBar />
    <div class="wrap home-wrap">
      <h1>Accueil</h1>
      <div class="home-info">
        <div class="home-icon">
          <b-icon icon='question' width="36px" height="38px"></b-icon>
        </div>
        <p class="home-text">
          Bonjour et bienvenue sur Vos Recettes Faciles, ici vous pouvez apprendre à cuisiner des recettes en tous genre
          et de toutes difficultés en respectant votre budget. <br>
          Les recettes qui vont sont proposées demanderont des ingrédients que vous pouvez trouver chez votre commerçant
          local.
        </p>
      </div>
      <div>
        <div class="tool-info">
          <div class="tool-icon">
            <b-icon icon='question' width="36px" height="38px"></b-icon>
          </div>
          <p class="tool-text">
            Vous avez des restes, des ingrédients et pas d'idées de recettes ? <br> Le <strong>Recet'omatic</strong> est
            là pour vous !
            Entrez les ingrédients que vous avez ou voulez utiliser et il s'occupe de vous trouver des recettes
            contenant les ingrédients listés; vous aurez également les recettes avec ces ingrédients même
            s'il y en a d'autre ! <br>
            Alors à vos claviers, prêt, feu, cuisinez !
          </p>
          <button class="catalogue-btn" @click="$router.push({ path: `/recipes/recetomatic` })">Essayer le ici !
            ici!</button>
        </div>
      </div>
      <div class="tool-link">
        <img src="" alt="">

      </div>
    </div>
    <FooterMain />
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style scoped>
.home-wrap {
  display: flex;
  text-align: center;
  flex-direction: column;
}

h1 {
  color: #FF5700;
}

.home-info {
  position: relative;
  width: 80%;
  margin: 1vh auto;
}

.home-icon {
  position: relative;
  z-index: 1;
  top: 20px;
  display: flex;
  justify-content: center;
  background-color: #FF5700;
  width: 80px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  color: #fff;
}

.home-text {
  position: relative;
  overflow: hidden;
  z-index: 50;
  font-size: 18px;
  border: 2px solid #FF5700;
  border-radius: 15px;
  background-color: #fff;
  color: #FF5700;
  padding: 25px;
}

.tool-info {
  position: relative;
  width: 80%;
  float: left;
  margin: 1vh auto;
  margin-left: 10%;
}

.tool-icon {
  position: relative;
  z-index: 1;
  top: 20px;
  display: flex;
  justify-content: center;
  background-color: #FF5700;
  width: 80px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50%;
  color: #fff;
}

.tool-text {
  position: relative;
  overflow: hidden;
  z-index: 50;
  font-size: 18px;
  border: 2px solid #FF5700;
  border-radius: 15px;
  background-color: #fff;
  color: #FF5700;
  padding: 25px;
}

.home-bg {
  position: absolute;
  min-height: 100vh;
  width: 100%;
  background-image: url('https://res.cloudinary.com/catalogue-recipe/image/upload/c_scale,w_auto,q_auto:low,x_20,y_396/v1653928715/tomato_bg.jpg');
}
</style>