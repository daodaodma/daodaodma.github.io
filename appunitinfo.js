//Defining the list of units in an array
var units = [
    {code:'ICT10001', desc:'Problem Solving with ICT', cp:12.5, type:'Core'},
    {code:'COS10005', desc:'Web Development', cp:12.5, type:'Core'},
    {code:'INF10003', desc:'Introduction to Business Information Systems', cp:12.5, type:'Core'},
    {code:'INF10002', desc:'Database Analysis and Design', cp:12.5, type:'Core'},
    {code:'COS10009', desc:'Introduction to Programming', cp:12.5, type:'Core'},
    {code:'INF30029', desc:'Information Technology Project Management', cp:12.5, type:'Core'},
    {code:'ICT30005', desc:'Professional Issues in Information Technology', cp:12.5, type:'Core'},
    {code:'ICT30001', desc:'Information Technology Project', cp:12.5, type:'Core'},
];

// creating a component for the units to pass in the router   
const Unit = {
    data() { return { units }; },
    //define the template for the route results
    template: `
    <div>
        <h2>Unit Code: {{$route.params.id}}</h2>
        <ul v-for="unit in filteredUnits": key="unit.code">
            <li>{{unit.code}}</li>
            <li>{{unit.desc}}</li>
            <li>{{unit.cp}}</li>
            <li>{{unit.type}}</li>
        </ul>
    </div>
    `,
    computed: {
        //filter function (returns the selected unit object )
        filteredUnits: function() {
        return this.units.filter((unit) => 
        unit.code.toLowerCase().includes(this.$route.params.id.toLowerCase()));
        }
    }
}

// Creating the VueRouter
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: 
    [{
        path: '/unit/:id',
        component: Unit
        } //defining path and the component
    ]
})

// create new app instance
const app = Vue.createApp({})
// creating component for the lookup table
app.component('app-lookup2', {
    data: function() {
    return {
        units,
    }
},
//defining template for the app
template: `
<div class="table-responsive">
    <table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Description</th>
                <th scope="col">More info</th>
            </tr>
        </thead>
        <tbody>
            <!-- Using v-for to loop and list them -->
            <tr v-for="unit in units": key="unit.code">
                <td>{{unit.code}}</td>
                <td>{{unit.desc}}</td>
                <td><router-link :to="'/unit/'+unit.code">Show Detail</router-link></td>
            </tr>
        </tbody>
    </table>
    <router-view></router-view>
</div>
    `
})
// use router, mount to app
app.use(router)
app.mount('#app')
