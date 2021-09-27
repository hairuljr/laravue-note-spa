<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Edit Note</div>
          <div class="card-body">
            <form action="#" method="post" @submit.prevent="update">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  v-model="form.title"
                  id="title"
                  class="form-control"
                />
                <div v-if="theErrors.title" class="mt-2 text-danger">
                  {{ theErrors.title[0] }}
                </div>
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <select
                  @change="selectedSubject"
                  id="subject"
                  class="form-control"
                >
                  <option
                    :value="form.subjectId"
                    v-text="form.subject"
                  ></option>
                  <template v-for="subject in subjects">
                    <option
                      v-if="form.subjectId != subject.id"
                      :key="subject.id"
                      :value="subject.id"
                    >
                      {{ subject.name }}
                    </option>
                  </template>
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
                class="btn btn-sm btn-primary d-flex align-items-center"
              >
                Update
                <template v-if="loading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="
                      margin: auto;
                      background: none;
                      display: block;
                      shape-rendering: auto;
                    "
                    width="30px"
                    height="22px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <rect x="17.5" y="30" width="15" height="40" fill="#85a2b6">
                      <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="18;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.2s"
                      ></animate>
                      <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="64;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.2s"
                      ></animate>
                    </rect>
                    <rect x="42.5" y="30" width="15" height="40" fill="#bbcedd">
                      <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="20.999999999999996;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.1s"
                      ></animate>
                      <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="58.00000000000001;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.1s"
                      ></animate>
                    </rect>
                    <rect x="67.5" y="30" width="15" height="40" fill="#dce4eb">
                      <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="20.999999999999996;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                      ></animate>
                      <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="58.00000000000001;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                      ></animate>
                    </rect>
                  </svg>
                </template>
              </button>
            </form>
          </div>
          <div class="card-footer">
            <router-link to="/notes/table" class="mr-3 btn btn-sm btn-secondary"
              >Back to List</router-link
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
      form: [],
      subjects: [],
      theErrors: [],
      selected: "",
      loading: false,
    };
  },

  mounted() {
    this.getSubjects();
    this.getNote();
  },

  methods: {
    async getSubjects() {
      let response = await axios.get("/api/subjects");
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },

    async getNote() {
      let { data } = await axios.get(
        `/api/notes/${this.$route.params.noteSlug}`
      );
      this.form = data.data;
    },

    selectedSubject(e) {
      this.selected = e.target.value;
    },

    // update the note
    async update() {
      this.loading = true;
      try {
        this.form["subject"] = this.selected || this.form.subjectId;

        let response = await axios.patch(
          `/api/notes/${this.$route.params.noteSlug}/edit`,
          this.form
        );
        if (response.status === 200) {
          this.loading = false;
          this.$toasted.show(response.data.message, {
            type: "success",
            icon: "check-double",
            duration: 3000,
            position: "top-center",
            theme: "bubble",
          });
          this.$router.push("/notes/table");
        }
      } catch (error) {
        this.loading = false;
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
};
</script>