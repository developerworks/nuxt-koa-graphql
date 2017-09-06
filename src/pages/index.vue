<template>
    <div>
       <h3>Users</h3>
        <li v-for="post in posts">{{ post.title }}</li>
    </div>
</template>

<script>
    import allPosts from '~/apollo/queries/allPosts.gql';

    export default {
        apollo: {
            posts: {
                prefetch: true,
                query: allPosts
            }
        }
    }
</script>