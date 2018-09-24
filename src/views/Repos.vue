<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
        ]
      }
    },

    methods:{
      getRepoInfo: function() {
        this.axios.get('https://api.github.com/users/viclec/repos/' + this.id).then((response) => {
          console.log(response.data)
          this.repo = response.data.map(item => {
            return {
              title: item.name,
              subtitle: item.description,
              id: item.id
            }
          });
        })
      }
    },

    beforeMount(){
        this.getRepoInfo()
    },
  }
</script>
