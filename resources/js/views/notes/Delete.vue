<template>
  <button class="btn btn-sm btn-danger" ref="deleteNote" @click="destroyNote">
    Delete
  </button>
</template>

<script>
export default {
  props: ["endpoint"],
  methods: {
    async destroyNote() {
      let q = window.confirm("Are you sure delete this note?");
      if (q == true) {
        let response = await axios.delete(`/api/notes/${this.endpoint}/delete`);
        if (response.status === 200) {
          this.$toasted.show(response.data.message, {
            type: "success",
            icon: "check-double",
            duration: 3000,
            position: "top-center",
            theme: "bubble",
          });
          this.$refs.deleteNote.parentNode.parentNode.remove();
        }
      }
    },
  },
};
</script>