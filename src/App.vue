<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
            >
              <v-list-tile-avatar>
                <v-avatar :color="item.color">
                  <span class="white--text headline">{{ item.title.charAt(0) }}</span>
                </v-avatar>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  <router-link v-on:click="saveRepo(item)" tag="li" :to="`/repos/${item.id}`">
                    <a>{{item.title}}</a>
                  </router-link>
                </v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
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
      getRepos: function() {
        this.axios.get('https://api.github.com/users/viclec/repos').then((response) => {
          this.items = response.data.map(item => {
            return {
              title: item.name,
              subtitle: item.description,
              id: item.id,
              color: this.randomColor()
            }
          });
        })
      },

      randomColor() {
        const r = () => Math.floor(256 * Math.random());

        return `rgb(${r()}, ${r()}, ${r()})`;
      },

      filterByStatus: function(repo) {
        this.updateRepo(repo)
      }
    },

    // ...mapActions([ // spread operator so that other methods can still be added.
    //   'updateRepo'
    // ]),

    beforeMount(){
        this.getRepos()
    },
  }
</script>