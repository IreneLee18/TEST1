<template>
  <nav class="fixed-top">
    <!-- phone & pad Size -->
    <div class="position-fixed h-100 w-75 hidebar"
    :class="{'showbar':bar}"
    >
      <div class="container-fluid d-flex flex-column fs-4 g-0">
        <div class="d-flex justify-content-between border-bottom border-primary">
          <router-link to="/" class="nav-link font-RubikMoonrocks fs-1">COFFEEEEE</router-link>
          <a href="#" class="nav-link align-self-end"
            @click.prevent="bar=!bar"
          >
            <i class="icon-btn fs-1 bi bi-x-lg"></i>
          </a>
        </div>
        <router-link to="/dashboard" class="phonePadSize-a nav-link py-4" @click.prevent="bar=!bar">產品</router-link>
        <router-link to="/dashboard/orders" class="phonePadSize-a nav-link pb-4" @click.prevent="bar=!bar">訂單</router-link>
        <router-link to="/dashboard/coupons" class="phonePadSize-a nav-link pb-4" @click.prevent="bar=!bar">優惠券</router-link>
        <a href="#" class="nav-link position-absolute bottom-0" @click.prevent="logout">
          <i class="icon-btn bi bi-door-closed"></i>
        </a>
      </div>
    </div>
    <div class="d-flex justify-content-between justify-content-lg-start align-items-center">
      <a href="#" class="nav-link d-lg-none"
        @click.prevent="bar=!bar"
      >
        <i class="icon-btn fs-1 bi bi-list"></i>
      </a>
      <router-link to="/" class="nav-link font-RubikMoonrocks fs-1" :class="{'d-none':bar}">COFFEEEEE</router-link>

      <!-- desktop Size -->
      <div class="d-none d-lg-flex justify-content-center align-items-center">
        <router-link to="/dashboard" class="desktopSize-a nav-link">產品</router-link>
        <router-link to="/dashboard/orders" class="desktopSize-a nav-link">訂單</router-link>
        <router-link to="/dashboard/coupons" class="desktopSize-a nav-link">優惠券</router-link>
      </div>

      <a href="#" class="logout-btn nav-link" @click.prevent="logout" :class="{'d-none':bar}">
        <i class="icon-btn fs-1 bi bi-door-closed"></i>
      </a>
    </div>
  </nav>
</template>
<style lang="scss">
@mixin a-after-hover{
  content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0%;
    height: 2px;
    background-color: darken(#DCDDDF,20%);
    transition: width 0.5s;
}
.desktopSize-a{
  position: relative;
  // padding-bottom: 2px;
  // margin-bottom: 16px;
  // @media (min-width:768px){
  //   padding-bottom: 5px;
  // }
  &::after{
    @include a-after-hover;
  }
  &:hover{
  color:darken(#DCDDDF,20%);
    &::after{
      width: 100%;
    }
  }
}
.hidebar{
  // background: linear-gradient(302deg,lighten(#53565c,10%), #dcdddf);
  background-image: url(https://images.unsplash.com/photo-1602153883150-a442f874f839?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80);
  background-size: cover;
  background-position: center;
  left: -100%;
  transition: left .8s;
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255,255,255,.3);
    height: 100%;
    width: 100%;
    z-index: -1;
  }
}
.showbar{
  left: 0%;
  .phonePadSize-a{
    &:hover{
      color:#fff;
    }
  }
}
.logout-btn{
  @media (min-width:992px){
    position: absolute;
    right: 0;
  }
}
.bi-door-closed{
  &:hover{
    color: #FF6363;
    &::before{
      content:'\f308'
    }
  }
}
</style>
<script>
export default {
  data () {
    return {
      bar: false
    }
  },
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api)
        .then((res) => {
          if (res.data.success) {
            document.cookie = `myToken=;expires= ${new Date(0)}`
            this.$router.push('/login')
          }
        })
        .catch((err) => console.log(err.response))
    }
  }
}
</script>
