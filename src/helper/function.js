import newTree from './../tree/newTree.json';

export const getJsonFromUniqueArray = () => {
    const a = [{"1":"Jiva Dada"},{"2":"Jina Dada"},{"3":"Dhanji Dada"},{"4":"Govindbhai"},{"5":"Jagdishbhai"},{"6":"Vishva"},{"6":"Drimil"},{"4":"Harjibhai"},{"5":"Prakashbhai"},{"6":"Digat"},{"6":"Rakshit"},{"5":"Ravibhai"},{"6":"Rudrax"},{"4":"Manjibhai"},{"5":"Himmatbhai"},{"6":"Jenil"},{"5":"Hiteshbhai"},{"6":"Henil"},{"5":"Vipulbhai"},{"6":"Vraj"},{"6":"Jas"},{"4":"Devrajbhai"},{"5":"Mayurbhai"},{"6":"Divam"},{"6":"Rivan"},{"4":"Jivarajbhai"},{"5":"Krunalbhai"},{"6":"Dhiyan"},{"5":"Rahilbhai"},{"3":"Khimaji Dada"},{"4":"Dharmshibhai"},{"5":"Vasrambhai"},{"6":"Hasmukhbhai"},{"7":"Meet"},{"7":"Dharmi"},{"6":"Ashvinbhai"},{"7":"Neel"},{"7":"Kunj"},{"7":"Krish"},{"5":"Bharatbhai"},{"6":"Piyushbhai"},{"7":"Dhayan"},{"6":"Nikunjbhai"},{"5":"Vinubhai"},{"6":"Jainik"},{"4":"Hirabhai"},{"5":"Pravinbhai"},{"6":"Harshadbhai"},{"7":"Hetshavi"},{"7":"Jaenam"},{"6":"Amitbhai"},{"7":"Hiyan"},{"5":"Ashokbhai"},{"6":"Yash"},{"6":"Yeshani"},{"3":"Jetha Dada"},{"4":"Gagjibhai"},{"5":"Girishbhai"},{"6":"Manas"},{"5":"Mukeshbhai"},{"6":"Parth"},{"6":"Drasti"},{"4":"Vithalbhai"},{"5":"Hareshbhai"},{"6":"Jeet"},{"5":"Himmatbhai"},{"6":"Saarth"},{"4":"Devrajbhai"},{"5":"Sandipbhai"},{"5":"Ashishbhai"},{"4":"Savjibhai"},{"5":"Mitulbhai"},{"6":"Dhairya"},{"5":"Mohit"}]
    const data = []
    for (let i = 0; i < a?.length; i++) {
        const getKey = (obj) => Object.keys(obj)?.[0] ? Number(Object.keys(obj)?.[0]) : -1
        const child = a[i] ?? null
        let cKey = getKey(child);

        const findFather = (fatherIndex) => {
            if (i < 1) return 'tejaniparivar'
            if (cKey <= 1) return 'tejaniparivar'
            if (fatherIndex === 2 && cKey <= 2) return 'tejaniparivar'
            let pIndex = i - (fatherIndex - 1)
            if (pIndex > -1) {
                for (let j = i; j >= 0; j--) {
                    const pFind = getKey(a[j])
                    if (pFind === (cKey - fatherIndex)) {
                        pIndex = j
                        break
                    }
                }
                return a[pIndex]?.[getKey(a[pIndex])] ?? ''
            }
        }

        data.push(`${child[cKey]} ${findFather(1)}, ${findFather(1)} ${findFather(2)}`)
    }
    return data
}

export const getConvertedTreeData = () => {
    const data = [{name: "tejaniparivar tejaniparivar", name_guj: "તેજાણી પરિવાર"}]
    for (const dataKey in newTree) {
        data.push(...newTree[dataKey])
    }
    return data
}
