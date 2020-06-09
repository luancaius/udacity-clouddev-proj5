<template>
  <div>
    <v-row>
      <v-col>
        <img
          :src="$auth.user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </v-col>
      <v-col>
        <h2>{{ $auth.user.name }}</h2>
        <p class="lead text-muted">{{ $auth.user.email }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <pre v-highlightjs="JSON.stringify($auth.user, null, 2)" class="rounded w-100"><code class="json"></code></pre>
      </v-col>
    </v-row>
  </div>
</template>

