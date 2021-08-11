import localData from '@/assets/cardInfo.json';

const state = {
    cards: [],
    abilities: [],
    keywords: [],
    nations: [],
    races: [],
    sets: [],
    triggers: [],
    types: [],
    version: "",
    grades: [0, 1, 2, 3],

    filters: {
        filterCards: [],
        name: "",
        skill: "",
        nations: [],
        grades: [],
        power: "",
        shield: "",
        abilities: [],
        race: "",
        sets: [],
        keywords: [],
        types: [],
        trigger: [],
        newFilters: true,
        order: "",
    },
};

const getters = {};

const mutations = {
    SET_DATA(state: any, data: any) {
        state.cards = data.cards;
        state.abilities = data.abilities;
        state.keywords = data.keywords;
        state.nations = data.nations;
        state.races = data.races;
        state.sets = data.sets;
        state.triggers = data.triggers;
        state.types = data.types;
        state.version = data.version;

        state.filters = {
            filterCards: data.cards,
            name: "",
            skill: "",
            nations: data.nations,
            grades: [0, 1, 2, 3, 4],
            power: "",
            shield: "",
            abilities: data.abilities,
            race: "",
            sets: data.sets,
            keywords: data.keywords,
            types: data.types,
            trigger: data.triggers,
            newFilters: true,
            order: "id",
        };
    },
    RESET_FILTERS(state: any) {
        state.filters = {
            filterCards: state.filters.cards,
            name: "",
            skill: "",
            nations: state.nations,
            grades: [0, 1, 2, 3, 4],
            power: "",
            shield: "",
            abilities: state.abilities,
            race: "",
            sets: state.sets,
            keywords: state.keywords,
            types: state.types,
            trigger: state.triggers,
            newFilters: true,
            order: "-id",
        };
    },
    SET_FILTERS(state: any,  data: any) {
        state.filters = {
            filterCards: state.filters.cards,
            name:  data.name ||  state.filters.name,
            skill:data.skill ||  state.filters.skill,
            nations: data.nations ||  state.filters.nations,
            grades: data.grades ||  state.filters.grades,
            power: data.power ||  state.filters.power,
            shield: data.shield ||  state.filters.shield,
            abilities: data.abilities ||  state.filters.abilities,
            race: data.race ||  state.filters.race,
            sets: data.sets ||  state.filters.sets,
            keywords: data.keywords ||  state.filters.keywords,
            types:data.types ||  state.filters.types,
            trigger: data.trigger ||  state.filters.trigger,
            newFilters: true,
            order: data.order ||  state.filters.order,
        };
    },
    
    APPLY_FILTER(state: any) {
        //by nation
        let result = state.cards.filter((e: any) => {
            if (state.filters.nations.includes(e.nation)) return e;
        });
        // // console.log(1, result);

        //by name
        result = result.filter((e: any) => {
            if (e.name.toLowerCase().includes(state.filters.name.toLowerCase())) return e;
        });

        // // console.log(2, result);

        //by skill
        result = result.filter((e: any) => {
            if (e.skill.toLowerCase().includes(state.filters.skill.toLowerCase())) return e;
        });

        // // console.log(3, result);

        //by grades
        result = result.filter((e: any) => {
            if (state.filters.grades.includes(e.grade)) return e;
        });
        // // console.log(4, result);

        //by power
        result = result.filter((e: any) => {
            if (e.power == Number(state.filters.power) || state.filters.power == "") return e;
        });
        // // console.log(5, result);

        //by shield
        result = result.filter((e: any) => {
            if (e.shield == Number(state.filters.shield) || state.filters.shield == "") return e;
        });
        // // console.log(6, result);

        //by Abilities
        result = result.filter((e: any) => {
            if (state.filters.abilities.includes(e.ability)) return e;
        });

        // // console.log(7, result);

        //by race
        result = result.filter((e: any) => {
            if (e.race.toLowerCase().includes(state.filters.race.toLowerCase())) return e;
        });
        // // console.log(8, result);

        //by sets
        result = result.filter((e: any) => {
            if (e.sets.some((r: any) => state.filters.sets.indexOf(r) >= 0)) return e;
        });
        // // console.log(9, result);

        //by keywords
        result = result.filter((e: any) => {
            if (e.keywords.some((r: any) => state.filters.keywords.indexOf(r) >= 0)) return e;
        });
        // // console.log(10, result);

        //by Types
        result = result.filter((e: any) => {
            if (state.filters.types.includes(e.type)) return e;
        });
        // // console.log(11, result);

        //by triggers
        result = result.filter((e: any) => {
            if (state.filters.trigger.includes(e.trigger)) return e;
        });
        // // console.log(12, result);

        //sort by order
        result = result.sort((a: any, b: any) => {
            const filter = state.filters.order;
            const inverse = filter.startsWith('-')? -1 : 1;

            //By name
            if(filter.endsWith('name'))  
            {
                if ( a.name > b.name ){
                    return -1 * inverse;
                }
                if ( a.name < b.name ){
                    return 1 *inverse;
                }
            }    

            //By set
            if(filter.endsWith('setCode'))  
            {
                if ( a.setCode > b.setCode ){
                    return -1 * inverse;
                }
                if ( a.setCode < b.setCode ){
                    return 1 *inverse;
                }
            }    

            //By grade     
            if(filter.endsWith('grade'))  
            {
                if ( a.grade > b.grade ){
                    return -1 * inverse;
                }
                if ( a.grade < b.grade ){
                    return 1 *inverse;
                }
            }     

            if(filter.endsWith('id'))
            {
                //sort by id
                if(Number(a.id) < Number(b.id))
                    return -1 *inverse;
        
                if(Number(a.id) > Number(b.id))
                    return 1 *inverse;
            }  
        });

        state.filters.filterCards = result;
    },
};

const actions = {
    fetchData({ commit }: any /*params*/) {
        return new Promise((resolve, reject) => {
            fetch(  "https://raw.githubusercontent.com/CrowOnslaught/VanguarDecks_V2/master/src/assets/cardInfo.json")
            .then((res) =>
                res
                    .json()
                    .then((data) => {
                        commit("SET_DATA", data);
                        resolve(data);
                    })
                    .catch((err) => reject(err))
            )
            .catch(err => {
                    commit("SET_DATA", localData);
            });
        });
    },
    setFilters({ commit }: any, params: any){
        commit("SET_FILTERS", params);
        commit("APPLY_FILTER");
    },
    resetFilters({ commit }: any){
        commit("RESET_FILTERS");
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
