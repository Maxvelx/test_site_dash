<template>
  <div class="content-wrapper">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Create new post</h3>
      </div>
      <!-- /.card-header -->
      <!-- form start -->
      <form @submit.prevent="submit">
        <div class="card-body col-md-12 row">
          <div class="card-body col-md-4">
            <div class="form-group input-group-lg">
              <label for="title">Post title</label>
              <input class="form-control" id="title" v-model="title" type="text"
                     required placeholder="title">
            </div>
            <div class="form-group input-group-lg">
              <label for="time_read">Time reading <p>Format: 6 min or 1 hour</p></label>
              <input class="form-control" id="time_read" v-model="time_read" type="text" placeholder="time read">
            </div>
            <div class="form-group input-group-lg">
              <label for="description">Post description</label>
              <textarea required style="height: 150px" class="form-control" id="description" v-model="description" type="text"
                        placeholder="description">
              </textarea>
            </div>
            <div class="form-group">
              <label for="exampleInputFile">Post image</label>
              <div class="input-group">
                <div class="custom-file">
                  <input required type="file" @change="fileSet" class="custom-file-input"
                         id="exampleInputFile">
                  <label class="custom-file-label" for="exampleInputFile">select</label>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body col-md-4">
            <div class="form-check pb-4">
              <input type="checkbox" :checked="checkbox === true" value="1" v-model="checkbox" class="form-check-input"
                     style="width: 20px;
            height: 20px" id="exampleCheck1">
              <label style="font-size: 20px;padding-left: 10px" class="form-check-label" for="exampleCheck1">
                Published on site?
              </label>
            </div>
            <div class="form-group input-group-lg">
              <label for="category_id">Select category</label>
              <select required id="category_id" v-model="category_id" class="select">
                <option v-for="category in this.$store.getters['post/categories']" :value="category.id">{{ category.title }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import api from "@/api";

export default {
  name: "CreateComponent",
  data() {
    return {
      tags: [],
      title: null,
      description: null,
      image: null,
      video_path: null,
      checkbox: true,
      category_id: null,
      time_read: null,
    }
  },
  mounted() {
    this.$store.dispatch('post/getDataPosts')
    $(function () {
      bsCustomFileInput.init();
    });
  },
  methods: {

    async submit() {
      const config = {'content-type': 'multipart/form-data'}
      const formData = new FormData()

      this.image ? formData.append('image', this.image) : ''
      formData.append('title', this.title)
      formData.append('time_read', this.time_read)
      formData.append('description', this.description)
      formData.append('is_published', this.checkbox)
      formData.append('category_id', this.category_id)

      try {
        await api.post('/api/admin/posts', formData, config)
            .then(res => {
              res.status === 201 ?  router.push('/posts') : ''
            })
      } catch (e) {
        alert('Error adding a new post')
      }
    },

    fileSet(e) {
      this.image = e.target.files[0]
    },

  },

}


</script>

<style scoped lang="scss">

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --select-border: #777;
  --select-focus: blue;
  --select-arrow: var(--select-border);
}

select {
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;
  height: 45px;
  background-color: transparent;
  color: white;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;

  // Stack above custom arrow
  z-index: 1;

  // Remove dropdown arrow in IE10 & IE11
  // @link https://www.filamentgroup.com/lab/select-css.html
  &::-ms-expand {
    display: none;
  }

  // Remove focus outline, will add on alternate element
  outline: none;
}

.select {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  select,
  &::after {
    grid-area: select;
  }

  min-width: 15ch;
  max-width: 30ch;

  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

  // Optional styles
  // remove for transparency
  background-color: #3a5f86;
  background-image: linear-gradient(to bottom, #3a5f86, #38516b 50%);

  // Custom arrow
  &:not(.select--multiple)::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
}

// Interim solution until :focus-within has better support
select:focus + .focus {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid var(--select-focus);
  border-radius: inherit;
}

select[multiple] {
  padding-right: 0;

  /*
   * Safari will not reveal an option
   * unless the select height has room to
   * show all of it
   * Firefox and Chrome allow showing
   * a partial option
   */
  height: 15rem;

  option {
    white-space: normal;

    // Only affects Chrome
    outline-color: var(--select-focus);
  }

}

.select--disabled {
  cursor: not-allowed;
  background-color: #eee;
  background-image: linear-gradient(to top, #ddd, #eee 33%);
}

label {
  font-size: 1.125rem;
  font-weight: 500;
}

.select + label {
  margin-top: 2rem;
}

body {
  min-height: 100vh;
  display: grid;
  place-content: center;
  grid-gap: 0.5rem;
  font-family: "Baloo 2", sans-serif;
  background-color: #e9f2fd;
  padding: 1rem;
}
</style>