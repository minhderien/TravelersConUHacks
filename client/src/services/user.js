<script>
export default {
    methods: {
        userChanged: function(event) {
            this.$store.commit('user', event.target.value)
        }
    }
}
</script>