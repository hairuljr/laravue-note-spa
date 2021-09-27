<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Make new Note</div>
          <div class="card-body">
            <form action="#" method="post" @submit.prevent="storeNote">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  id="title"
                  v-model="form.title"
                  class="form-control"
                />
                <div
                  class="mt-2 text-danger"
                  v-if="theErrors.title"
                  v-text="theErrors.title[0]"
                ></div>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <select
                  class="form-control"
                  v-model="form.subject"
                  id="subject"
                >
                  <option
                    v-for="subject in subjects"
                    :key="subject.id"
                    :value="subject.id"
                    v-text="subject.name"
                  ></option>
                </select>
                <div v-if="theErrors.subject" class="mt-2 text-danger">
                  {{ theErrors.subject[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  v-model="form.description"
                  id="description"
                  rows="5"
                  class="form-control"
                ></textarea>
                <div v-if="theErrors.description" class="mt-2 text-danger">
                  {{ theErrors.description[0] }}
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary d-flex align-items-center"
              >
                Save
              </button>
            </form>
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
      form: {
        title: "",
        description: "",
        subject: "",
      },
      subjects: [],
      theErrors: [],
    };
  },
  methods: {
    // get subjects from API
    async getSubjects() {
      let response = await axios.get("/api/subjects");
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },
    // store form create note
    async storeNote() {
      try {
        let response = await axios.post(
          "/api/notes/create-new-note",
          this.form
        );
        if (response.status === 200) {
          (this.form.title = ""),
            (this.form.subject = ""),
            (this.form.description = ""),
            (this.theErrors = []),
            this.$toasted.show(response.data.message, {
              type: "success",
              icon: "check-double",
              duration: 3000,
              position: "top-center",
              theme: "bubble",
            });
        }
      } catch (error) {
        this.$toasted.show("Something went wrong.", {
          type: "error",
          icon: "times",
          duration: 3000,
          position: "top-center",
          theme: "bubble",
        });
        this.theErrors = error.response.data.errors;
      }
    },
  },
  mounted() {
    this.getSubjects();
  },
};
</script>