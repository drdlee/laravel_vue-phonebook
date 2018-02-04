<template>
    <div class="modal" :class="openModal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add New Contact</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input v-model="list.name" class="input" :class="{'is-danger':errors.name}" type="text" placeholder="e.g Christian Bautista" required autofocus>
                    </div>
                    <p v-if="errors.name" class="help is-danger">{{ errors.name[0] }}</p>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input v-model="list.email" class="input" :class="{'is-danger':errors.email}" type="email" placeholder="e.g christian.baut@hotmail.com" required>
                    </div>
                    <p v-if="errors.email" class="help is-danger">{{ errors.email[0] }}</p>
                </div>
                <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control">
                        <input v-model="list.phone" class="input" :class="{'is-danger':errors.phone}" type="number" placeholder="e.g 0778 - 484652">
                    </div>
                    <p v-if="errors.phone" class="help is-danger">{{ errors.phone[0] }}</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="save">Save</button>
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'openModal'
    ],
    data(){
        return {
            list: {},
            errors: {}
        }
    },
    methods: {
        close(){
            this.$emit('closeRequest')
            this.errors = {}
        },
        save(){
            axios.post('/phonebook', this.$data.list)
            .then((response)=> {
                this.close()
                this.$parent.list.push(response.data)
                this.$parent.list.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    } else if(a.name < b.name){
                        return -1;
                    }
                });
                this.list = {}
            })
            .catch((err)=> this.errors = err.response.data.errors)
        }
    }
}
</script>
