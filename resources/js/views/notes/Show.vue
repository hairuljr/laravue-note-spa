<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title" v-text="note.title"></h5>
            <h6
              class="card-subtitle mb-2 text-muted"
              v-text="note.subject"
            ></h6>
            <p class="card-text">
              {{ note.description }}
            </p>
            <router-link to="/notes/table" class="btn btn-sm btn-secondary"
              >Back to List</router-link
            >
            <router-link
              :to="{ name: 'notes.edit', params: { noteSlug: note.slug } }"
              class="btn btn-sm btn-success"
              >Edit</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: [],
    };
  },
  mounted() {
    this.getNote();
  },
  methods: {
    async getNote() {
      let { data } = await axios.get(
        "/api/notes/" + this.$route.params.noteSlug
      );
      this.note = data.data;
    },
  },
};
</script>