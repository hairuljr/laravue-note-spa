<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">List of Note</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Publish At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="note in notes" :key="note.id">
                    <td>
                      <router-link
                        :to="{
                          name: 'notes.show',
                          params: { noteSlug: note.slug },
                        }"
                        v-text="note.title"
                      ></router-link>
                    </td>
                    <td v-text="note.subject"></td>
                    <td v-text="note.published"></td>
                    <td>
                      <router-link
                        :to="{
                          name: 'notes.edit',
                          params: { noteSlug: note.slug },
                        }"
                        class="btn btn-sm btn-success"
                        >Edit</router-link
                      >
                      <delete :endpoint="note.slug" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Delete from "./Delete";
export default {
  components: {
    Delete,
  },
  data() {
    return {
      notes: [],
    };
  },
  mounted() {
    this.getNotes();
  },
  methods: {
    async getNotes() {
      let { data } = await axios.get("/api/notes");
      this.notes = data.data;
    },
  },
};
</script>