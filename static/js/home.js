Vue.config.devtools = true
Vue.config.delimiters = ['[[', ']]']
new Vue({
	el: '#todoapp',
	data: {
		msg: '',
		items: [],
	},
	ready: function() {
		this.$http.get('/todo')
			.then((response) => {
				console.log(response.data.messages)
				this.$set('items', response.data.messages)
			})
			.catch((response) => {
				console.log(response)
			})
	},
	computed: {
		finishedItems: {
			get: function() {
				return this.items.filter((item) => {
					return item.finished
				})
			}
		},
		todoItems: {
			get: function() {
				return this.items.filter((item) => {
					return !item.finished
				})
			}
		}
	},
	methods: {
		addItem: function() {
			this.$http.post('/todo', {
					msg: this.msg
				})
				.then((response) => {
					console.log(response.data)
					this.items.unshift(response.data)
				})
				.catch((response) => {
					console.log(response)
				})
			this.msg = ''
		},
		removeItem: function(item) {
			this.$http.delete(`/todo/${item.id}`)
				.then((response) => {
					console.log(response.data)
					if (response.data.result) {
						let index = this.items.indexOf(item)
						this.items.splice(index, 1)
					}
				})
				.catch((response) => {
					console.log(response)
				})
		},
		finishItem: function(item) {
			let finished = !item.finished
			this.$http.put('/todo', {
					id: item.id,
					finished: finished
				})
				.then((response) => {
					console.log(response.data)
					let index = this.items.indexOf(item)
					this.items.splice(index, 1, response.data)
				})
				.catch((response) => {
					console.log(response)
				})
		}
	}
})