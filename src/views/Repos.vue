<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex>
        <h1>Repos</h1>
      </v-flex>
    </v-layout>
    <v-layout row orange lighten-2 align-center>
      <v-flex text-xs-center orange py-3>
        <h3 class="headline mb-0">
          {{ user.name }}
        </h3>
        
        <v-avatar
          color="grey lighten-4"
        >
          <img :src="user.avatar_url" alt="avatar">
        </v-avatar>

        <div>
          <h4 class="subheading">
            <v-icon dark>place</v-icon>
            {{ user.location }}
          </h4>
        </div>

      </v-flex>
      <v-flex body-2 text-xs-center>
        {{ user.bio }}
      </v-flex>
      <v-flex orange>
        <h4 class="subheading">
          {{ user.followers }}
          followers
        </h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-list two-line>
            <template v-for="(repo) in repos">
              <v-subheader
                v-if="repo.header"
                :key="repo.header"
              >
                {{ repo.header }}
              </v-subheader>

              <v-list-tile
                :href="repo.html_url"
                target="_blank"
                v-else
                :key="repo.name"
                avatar
              >
                <v-list-tile-avatar>
                  <v-avatar :color="repo.color">
                    <span class="white--text headline">{{ repo.name.charAt(0) }}</span>
                  </v-avatar>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    {{repo.name}}
                    <div v-if="repo.private">
                  <fa :icon="['fab', repo.icon]" />
                      <fa icon="lock" />
                    </div>
                  </v-list-tile-title>
                  <v-list-tile-sub-title v-html="repo.description"></v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <fa :icon="['fab', repo.icon]" />
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        repos: [

        ],
        user: {

        }
      }
    },

    methods:{
      getRepos: function() {
        this.repos = [];
        this.getGitHubRepos();
        this.getGitlabRepos();
      },

      getGitHubRepos: function() {
        this.axios.get('https://api.github.com/users/viclec/repos', {
          access_token: '2b586e50eb4908c56fbfccb22d18c70a0380c46e',
        }).then((response) => {
          var gitHubRepos = response.data.map(repo => {
            repo.color = this.randomColor();
            repo.icon = 'github';

            return repo;
          });

          this.repos = this.repos.concat(gitHubRepos);
        })
      },
      
      getGitlabRepos: function() {
        this.axios.get('https://gitlab.com/api/v4/users/viclec/projects', {
          headers: {
            'Private-Token': 'MFrnUbLEnFusR1-KZ7yV'
          }
        }).then((response) => {
          var gitlabRepos = response.data.map(repo => {
            repo.color = this.randomColor();
            repo.private = repo.visibility === 'private';
            repo.html_url = repo.web_url;

            repo.icon = 'gitlab';

            return repo;
          });
          this.repos = this.repos.concat(gitlabRepos);
        })
      },

      getUser: function() {
        this.axios.get('https://api.github.com/users/viclec', {
          access_token: '2b586e50eb4908c56fbfccb22d18c70a0380c46e',
        }).then((response) => {
          this.user = response.data
        })
      },

      randomColor() {
        const r = () => Math.floor(256 * Math.random());

        return `rgb(${r()}, ${r()}, ${r()})`;
      },
    },

    beforeMount(){
        this.getRepos()
        this.getUser()
    },
  }
</script>