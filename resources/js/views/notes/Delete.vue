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
      try {
        let result = await this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this note!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed === true) {
          let response = await axios.delete(
            `/api/notes/${this.endpoint}/delete`
          );
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>