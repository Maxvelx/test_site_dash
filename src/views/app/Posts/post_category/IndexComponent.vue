<template>
  <div class="content-wrapper">
    <div class="col-12 py-3 mx-3">
      <a v-if="!addNewTrigger" class="btn btn-primary" @click.prevent="addNewTriggers">Add new category</a>
      <div class="form-group input-group col-md-5" v-if="addNewTrigger">
        <input class="form-control" id="title" v-model="title" type="text"
               placeholder="Name category">
        <div class="input-group-append">
          <button @click.prevent="addNewCategory" :disabled="!title" class="btn btn-primary">Add New</button>
        </div>
      </div>
    </div>
    <div class="row col-md-12 mx-2">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">List of category for posts</h3>
          </div>
          <!-- /.card-header -->
          <div>
            <table style="color: black">
              <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="category in categories">
                <tr v-if="!isEdit(category.id)">
                  <td>
                    <a style="padding-left: 20px" @click.prevent="inputEdit(category.id, category.title)"
                       class="text-success" href=""><i
                        class="fas fa-edit"></i></a>
                  </td>
                  <td @click.prevent="inputEdit(category.id, category.title)">{{ category.title }}</td>
                  <td><a class="text-danger" @click.prevent="getDelete(category.id)" style="padding-left: 20px" href=""><i
                      class="fas fa-trash-alt"></i></a>
                  </td>
                </tr>
                <tr v-if="isEdit(category.id)">
                  <td>
                    <a @click.prevent="updateCategory(category.id, category.title)" href=""><i
                        class="fas fa-check-circle"></i> Готово</a>
                  </td>
                  <td>
                    <input style="color: black" class="col-md-7" v-model="title"
                           v-on:keydown.enter="updateCategory(category.id, category.title)" type="text"
                           placeholder="Name category">
                  </td>
                  <td></td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <div class="row pl-3" v-if="paginate !== null && paginate.total > 10">
      <div class="col-sm-12 col-md-5" style="padding-left: 20px;padding-right: 20px">
        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
          <ul class="pagination">
            <li v-if="paginate.current_page !== 1" class="page-item">
              <a @click.prevent="getAllCategories(paginate.current_page -1)" class="page-link" href=""
                 tabindex="-1">
                <span class="fa fa-arrow-left"></span></a></li>
            <li v-for="link in paginate.links" :class="link.active ? 'active' : ''" class="page-item"
                aria-current="page">
              <template v-if="Number(link.label)">
                <a @click.prevent="getAllCategories(link.label)" class="page-link" href="">{{ link.label }}
                  <span
                      class="sr-only"></span></a>
              </template>
            </li>
            <li v-if="paginate.current_page !== paginate.last_page" class="page-item">
              <a class="page-link" href="" @click.prevent="getAllCategories(paginate.current_page +1)">
                <span class="fa fa-arrow-right"></span></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "IndexComponent",
  data() {
    return {
      title: null,
      categories: null,
      paginate: null,
      addNewTrigger: null,
      categoryId: null,
    }
  },
  mounted() {
    this.getAllCategories()
  },
  methods: {

    getAllCategories(page = 1) {
      api.get('/api/admin/post_category?page=' + page)
          .then(res => {
            this.categories = res.data.data
            this.paginate = res.data
          })
    },

    addNewCategory() {
      api.post('/api/admin/post_category', {title: this.title})
          .then(res => {
            if (res.status === 201) {
              this.categoryId = null
              this.title = null
              this.addNewTrigger = null
              this.getAllCategories()
            }
          })
    },

    updateCategory(id, title) {
      if (this.title !== title) {
        api.patch('/api/admin/post_category/' + id, {title: this.title})
            .then(res => {
              if (res.status === 200) {
                this.addNewTrigger = null
                this.title = null
                this.getAllCategories()
              }
            })
      }
      this.categoryId = null
      this.title = null
    },

    getDelete(id) {
      api.delete('/api/admin/post_category/' + id)
          .then(res => {
            if (res.status === 200) {
              this.getAllCategories()
            }
          })

    },

    addNewTriggers() {
      this.addNewTrigger = 1
      this.title = null
      this.categoryId = null
    },

    inputEdit(id, title) {
      this.addNewTrigger = null
      this.categoryId = id
      this.title = title
    },

    isEdit(id) {
      return this.categoryId === id
    }

  },
}
</script>

<style scoped lang="scss">
// sets

$gl-ms: "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs: "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm: "screen and (max-width: 48em)"; // max 768px
$gl-md: "screen and (max-width: 64em)"; // max 1024px
$gl-lg: "screen and (max-width: 80em)"; // max 1280px

// table style

table {
  border-spacing: 1px;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  position: relative;
  -webkit-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  -moz-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  -o-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  box-shadow: 0 38px 100px rgba(23, 26, 33, 0.2);

  * {
    position: relative
  }

  td, th {
    padding-left: 18px;
    padding-right: 18px;

  }

  thead tr {
    height: 60px;
    background: #f5c34b;
    font-size: 16px;
  }

  tbody tr {
    height: 48px;
    border-bottom: 2px solid #E3F1D5;

    &:last-child {
      border: 0;
    }
  }

  td, th {
    text-align: left;

    &.l {
      text-align: right
    }

    &.c {
      text-align: center
    }

    &.r {
      text-align: center
    }
  }
}


@media #{$gl-xs}              {

  table {
    display: block;

    > *, tr, td, th {
      display: block
    }

    thead {
      display: none
    }

    tbody tr {
      height: auto;
      padding: 8px 0;

      td {
        padding-left: 45%;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 30px
        }

        &:before {
          position: absolute;
          font-weight: 700;
          width: 40%;
          left: 10px;
          top: 0
        }

        &:nth-child(1):before {
          content: "Action";
        }

        &:nth-child(2):before {
          content: "Title";
        }

        &:nth-child(3):before {
          content: "Delete";
        }
      }
    }
  }
}


// body style

body {
  background: #9BC86A;
  font: 400 14px 'Calibri', 'Arial';
  padding: 20px;
}

blockquote {
  color: white;
  text-align: center;
}
</style>