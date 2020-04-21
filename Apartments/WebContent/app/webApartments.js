Vue.component("web-apartments", {
	data: function () {
		    return {
		      apartments: null
		    }
	},
	template: ` 
<div>
	Apartments with available rooms!!:
	<table border="1">
	<tr bgcolor="lightgrey">
		<th>Name</th>
		<th>Price</th>
		<th>&nbsp;</th>
	</tr>
		
	<tr v-for="apartment in apartments">
		<td>{{apartment.name }}</td>
		<td>{{apartment.price}}</td>
		<td>
			<input type="number" style="width:40px" size="3" v-model="apartment.count" name="itemCount"> 
			<input type="hidden" name="itemId" v-model="apartment.id"> 
			<button v-on:click="addToCart(apartment)">Add</button>
		</td>
	</tr>
</table>
	<p>
		<a href="#/rc">Let's see reservation cart</a>
	</p>
</div>		  
`
	, 
	methods : {
		addToCart : function (apartment) {
			axios
			.post('rest/apartments/add', {"id":''+apartment.id, "count":parseInt(apartment.count)})
			.then(response => (toast('Apartment ' + apartment.name + " added to the Reservation Cart")))
		}
	},
	mounted () {
        axios
          .get('rest/apartments/getJustApartments')
          .then(response => (this.apartments = response.data))
    },
});