import newTree from './../tree/newTree.json';

export const getJsonFromUniqueArray = () => {
    const a = [{"1":"Diyal"},{"2":"Devshi","8":"Kadviebn"},{"3":"Shamji","8":"Ratanben"},{"4":"Dungarshi","8":"Shardaben"},{"5":"Bharat"},{"6":"Parth"},{"6":"Hari"},{"5":"Dharmesh","8":"Margiben"},{"4":"Ganesh","8":"Kailashben"},{"5":"Vasant","8":"Dakshaben"},{"4":"Dinesh","8":"Hiraben"},{"5":"Tilak"},{"4":"Mukesh","8":"Parulben"},{"5":"Tejas"},{"3":"Parshotam","8":"Maniben"},{"4":"Savji","8":"Prabhaben"},{"5":"Hiren","8":"Bhumiben"},{"6":"Vrunda"},{"6":"Dhyan"},{"5":"Kiran","8":"Kinjalben"},{"6":"Dhyey"},{"6":"Mahir"},{"4":"Premji","8":"Vasantben"},{"5":"Rajesh","8":"Sangitaben"},{"6":"Vraj"},{"6":"Dhruv"},{"5":"Alpesh","8":"Shilpaben"},{"6":"Jal"},{"2":"Hari","8":"Dholiben"},{"3":"Megha"},{"4":"Jivraj","8":"Nanduben"},{"5":"Babu","8":"Vimlaben"},{"6":"Jayesh","8":"Alpaben"},{"7":"Janvi"},{"7":"Jyot"},{"6":"Gautam","8":"Dayaben"},{"7":"Jiyansh"},{"5":"Dhanji","8":"Rekhaben"},{"6":"Shyam"},{"5":"Ishvar","8":"Varshaben"},{"6":"Kishan"},{"6":"Mit"},{"3":"Madha","8":"Javalben"},{"4":"Ranchhod","8":"Champaben"},{"5":"Daya","8":"Varshaben"},{"6":"Jay"},{"5":"Satish","8":"Sonalben"},{"6":"Het"},{"6":"Ved"},{"2":"Dipa"}]
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
