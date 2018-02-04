<template>
    <div>
        <nav class="panel column is-offset-2 is-8">
            <p class="panel-heading">
                Vuejs Phonebook
                <button class="button is-link is-outlined" @click="openAdd">
                Add New
                </button>
            </p>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input v-model="searchQuery" class="input is-small" type="text" placeholder="search">
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
            <a class="panel-block" v-if="filteredList == 0">
                <span class="has-text-danger">No Result</span>
            </a>
            <a class="panel-block" v-for="(item, key) in filteredList" :key="item.id" v-if="filteredList" @click="openShow(item.id)">
                <span class="column is-8">
                    {{ item.name }}
                </span>
                <span class="column is-1">
                    <span class="button is-small" @click="openShow(item.id)">view</span> 
                </span>
                <span class="column is-1">
                    <span class="button is-small is-primary" @click="openEdit(item.id)">edit</span> 
                </span>
                <span class="column is-1">
                    <span class="button is-small is-danger" @click="del(item.id, key)">delete</span>
                </span>
            </a>
        </nav>

        <Add :openModal="addActive" @closeRequest="close"></Add>
        <Show :openModal="showActive" @closeRequest="close" ref="showDetails"></Show>
        <Edit :openModal="editActive" @closeRequest="close" ref="editPage"></Edit>

    </div>
</template>
<script>

export default {
    data(){
        return {
            addActive: '',
            showActive: '',
            editActive: '',
            list: [],
            temp: '',
            errors: {},
            searchQuery: ''
        }
    },
    methods: {
        openAdd(){
            this.addActive = 'is-active';
        },
        close(){
            this.addActive = '';
            this.showActive = '';
            this.editActive = '';
        },
        openShow(key){
            const data = this.list.filter((item)=> item.id == key);
            this.$refs.showDetails.list = data[0];

            this.showActive = "is-active";
        },
        openEdit(key){
            const data = this.list.filter((item)=> item.id == key);
            this.$refs.editPage.list = data[0];

            this.editActive = "is-active";
        },
        del(id, key){
            if(confirm('Sure to delete?')){
                axios.delete(`/phonebook/${id}`)
                .then((res)=> {
                    return this.list = this.list.filter((x)=> x.id != id)
                })
                .catch((err)=> console.log(err));
            }

        },
    },
    mounted() {
        axios.post('/getData')
        .then((res)=> this.list = res.data)
        .catch((err)=> this.errors = err.response.data.errors);
    },
    // watch: {
    //     searchQuery(){
    //         if (this.searchQuery.length > 0){
    //             this.temp = this.list.filter((item)=>{
    //                 return item.name.toLowerCase()
    //                         .indexOf(this.searchQuery.toLowerCase()) > -1;
    //             });
    //         } else {
    //             this.temp = this.list
    //         }
    //     }
    // },
    computed: {
        filteredList(){
            return this.list.filter(item => {
                return Object.keys(item).some((key)=>{
                    const str = String(item[key]);
                    console.log(str)
                    return str.toLowerCase()
                        .includes(this.searchQuery.toLowerCase())
                })
            })
        }
    }
}
</script>
