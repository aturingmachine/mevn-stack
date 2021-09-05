<template>
  <article>
    <v-card class="mb-10">
      <v-card-title class="text-h4">
        Welcome to the MEVN Stack template!
      </v-card-title>
      <v-card-text class="text-h6">
        <!-- <p class="text-h6"> -->
        This project is meant to do most of the boilerplate work of standing up
        a MEVN stack for you, so you can focus more on the specifics of your
        implementation. It also aims to provide some more implementation
        specific patterns, such as a centralized solution to controlling Modals
        within the client, and easy to dispatch snackbar notifications.
        <!-- </p> -->
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title class="text-h5">Contributing</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-card>
              <v-card-title class="text-h6">Issue Reporting</v-card-title>
              <v-card-text class="text-body1">
                If you have an issue with the template itself please feel free
                to file an issue on the GitHub repository issue tracker.
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="info"
                  class="bright--text"
                  tag="a"
                  href="https://github.com/aturingmachine/mevn-stack/issues"
                >
                  GitHub Issues&nbsp;
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title class="text-h6">Improvements</v-card-title>
              <v-card-text class="text-body1">
                Improvements and Suggestions are always welcome! Feel free to
                file and issue and submit a pull request where we can discuss
                the proposal further.
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="info"
                  class="bright--text"
                  tag="a"
                  href="https://github.com/aturingmachine/mevn-stack"
                >
                  GitHub Repo&nbsp;
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title class="text-h6">Code Of Conduct</v-card-title>
              <v-card-text class="text-body1">
                Contributing requires you follow some basic rules laid out in
                the Code of Conduct in this repo.
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="info"
                  class="bright--text"
                  tag="a"
                  href="https://github.com/aturingmachine/mevn-stack/blob/master/.github/CODE_OF_CONDUCT.md"
                >
                  Code of Conduct&nbsp;
                  <v-icon small>mdi-open-in-new</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title class="text-h5">Employed Technologies</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="docCard in docCards" :key="docCard.title" cols="4">
              <v-card
                :color="docCard.color"
                :class="`${docCard.textColor}--text`"
              >
                <v-card-title class="text-h5">
                  {{ docCard.isClient ? 'Client' : 'Server' }} -
                  {{ docCard.title }}
                </v-card-title>

                <v-card-subtitle :class="`${docCard.textColor}--text`">
                  {{ docCard.body }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="info"
                    class="bright--text"
                    tag="a"
                    :href="docCard.link"
                  >
                    {{ docCard.cta }}&nbsp;
                    <v-icon small>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col v-for="docCard in devDocCards" :key="docCard.title" cols="4">
              <v-card
                :color="docCard.color"
                :class="`${docCard.textColor}--text`"
              >
                <v-card-title class="text-h5">
                  {{ docCard.title }}
                </v-card-title>

                <v-card-subtitle :class="`${docCard.textColor}--text`">
                  {{ docCard.body }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="info"
                    class="bright--text"
                    tag="a"
                    :href="docCard.link"
                  >
                    {{ docCard.cta }}&nbsp;
                    <v-icon small>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <!-- <h2>Employed Technology Documentation:</h2> -->
    <!-- <v-container>
      <v-row>
        <v-col v-for="docCard in docCards" :key="docCard.title" cols="4">
          <v-card :color="docCard.color" :class="`${docCard.textColor}--text`">
            <v-card-title class="text-h5">
              {{ docCard.isClient ? 'Client' : 'Server' }} - {{ docCard.title }}
            </v-card-title>

            <v-card-subtitle :class="`${docCard.textColor}--text`">
              {{ docCard.body }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="info"
                class="bright--text"
                tag="a"
                :href="docCard.link"
              >
                {{ docCard.cta }}&nbsp;
                <v-icon small>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-for="docCard in devDocCards" :key="docCard.title" cols="4">
          <v-card :color="docCard.color" :class="`${docCard.textColor}--text`">
            <v-card-title class="text-h5">
              {{ docCard.title }}
            </v-card-title>

            <v-card-subtitle :class="`${docCard.textColor}--text`">
              {{ docCard.body }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                color="info"
                class="bright--text"
                tag="a"
                :href="docCard.link"
              >
                {{ docCard.cta }}&nbsp;
                <v-icon small>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
  </article>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    docCards: [
      {
        title: 'Vue.js',
        color: '#359469',
        textColor: 'bright',
        link: 'https://vuejs.org/',
        cta: 'Vue.js Docs',
        body: 'Vue.js is a JavaScript framework for building web applications.',
        isClient: true,
      },
      {
        title: 'Vuex',
        color: '#359469',
        textColor: 'bright',
        link: 'https://vuex.vuejs.org/',
        cta: 'Vuex Docs',
        body: 'Vuex is a state management pattern for Vue.js.',
        isClient: true,
      },
      {
        title: 'Vuetify',
        color: '#2196F3',
        textColor: 'bright',
        link: 'https://vuetifyjs.com/en/',
        cta: 'Vuetify Docs',
        body: 'Vuetify is a Material Design component framework for Vue.js',
        isClient: true,
      },
      {
        title: 'Axios',
        color: '#5B29E4',
        textColor: 'bright',
        link: 'https://axios-http.com/docs/intro',
        cta: 'Axios Docs',
        body: 'Axios is a Promise based HTTP client.',
        isClient: true,
      },
      {
        title: 'Node.js',
        color: '#026E00',
        textColor: 'bright',
        link: 'https://nodejs.org/en/',
        cta: 'Node.js Docs',
        body: 'Node.js. is a JavaScript runtime.',
        isClient: false,
      },
      {
        title: 'Express',
        color: '#EEEEEE',
        textColor: 'black',
        link: 'http://expressjs.com//',
        cta: 'Express Docs',
        body: 'Express is a web frammkework for Node.js.',
        isClient: false,
      },
      {
        title: 'mongoose',
        color: '#880000',
        textColor: 'bright',
        link: 'https://mongoosejs.com/',
        cta: 'mongoose Docs',
        body: 'mongoose is an object-document mapper for Node.js and mongoDB.',
        isClient: false,
      },
      {
        title: 'mongoDB',
        color: '#13AA52',
        textColor: 'bright',
        link: 'https://www.mongodb.com/',
        cta: 'mongoDB',
        body: 'mongoDB is a no-SQL database.',
        isClient: false,
      },
    ],
    devDocCards: [
      {
        title: 'ESLint',
        color: '#4B32C3',
        textColor: 'bright',
        link: 'https://eslint.org/',
        cta: 'ESLint Docs',
        body: 'ESLint is an extendable JavaScript Linter.',
      },
      {
        title: 'Vue CLI',
        color: '#359469',
        textColor: 'bright',
        link: 'https://cli.vuejs.org/',
        cta: 'Vue CLI Docs',
        body: 'The Vue CLI provides a standard set of tooling for Vue.js projects.',
      },
      {
        title: 'nodemon',
        color: '#76D04B',
        textColor: 'black',
        link: 'https://nodemon.io/',
        cta: 'nodemon Docs',
        body: 'nodemon is a tool for automatically reloading Node.js projects following source code changes.',
      },
      {
        title: 'NVM',
        color: '#026E00',
        textColor: 'bright',
        link: 'https://github.com/nvm-sh/nvm/blob/master/README.md',
        cta: 'nvm Repo',
        body: 'nvm is a version manager for Node.js.',
      },
    ],
  }),
}
</script>
