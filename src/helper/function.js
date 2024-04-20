import newTree from './../tree/newTree.json';

export const getJsonFromUniqueArray = () => {
    const a = [{"1":"HARJIDADA"},{"2":"BHAGWANDADA"},{"3":"PARSHOTTAM DADA"},{"4":"BHIKHADADA"},{"5":"RAVJIBHAI"},{"6":"PARESH"},{"7":"JAY"},{"7":"JAMNESH"},{"6":"VISHAL"},{"7":"TAKSH"},{"5":"SANTIBHAI"},{"6":"UMESH"},{"7":"HAYAN"},{"5":"KARAMSHIBHAI"},{"6":"VIJAY"},{"7":"SHREYANSH"},{"3":"KESHUDADA"},{"4":"JASMATDADA"},{"5":"SURESHBHAI"},{"6":"KALPESH"},{"7":"PRATHAM"},{"6":"MAHESH"},{"5":"BABUBHAI"},{"6":"NIRAJ"},{"6":"HARSHIL"},{"4":"NANJIDADA"},{"5":"VALLABHBHAI"},{"6":"RAJENDRA"},{"7":"HARSH"},{"7":"JIYANSHI"},{"6":"NILESH"},{"7":"MAHI"},{"6":"ALPESH"},{"7":"KAIRA"},{"5":"MANIJIBHAI"},{"6":"RUTVIK"},{"5":"KARAMSHIBHAI"},{"6":"VAIRAG"},{"6":"SHRENIKA"}]
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
