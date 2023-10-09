// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import { type CollectionEntry, getCollection } from 'astro:content';

export const SITE_TITLE = 'Syntia';
export const SITE_DESCRIPTION = 'Welcome to my website!';
export const PROJECT_COLLECTION = "projects";
export const WORKSHOP_COLLECTION = "workshops";
export const RESEARCH_COLLECTION = "research";
export const WEEKENDER_COLLECTION = "weekender";

export const EN_COLLECTION = 'en';
export const DE_COLLECTION = 'de';
export const FR_COLLECTION = 'fr';

type ICollection = 'en' | 'de' | 'fr';

export const getAllCollections = async (filter?: (entry: CollectionEntry<ICollection>) => any): Promise<any[]> => {
    const ids = [EN_COLLECTION, DE_COLLECTION, FR_COLLECTION];
    let collections = [];
    for (let i = 0; i < ids.length; i++) {
        const lang = ids[i];
        let data = [];
        if (!!filter) {
            data = await getCollection(lang as ICollection, filter);
        } else {
            data = await getCollection(lang as ICollection);
        }
        collections = [
            ...collections,
            ...data,
        ]
    }
    return collections;
}

export const getIndexCollection = async (lang): Promise<any> => {
    let index = (await getCollection(lang, ({ id }) => {
        return id.startsWith('index');
    }));
    if (!index) {
        index = (await getCollection(EN_COLLECTION, ({ id }) => id.startsWith('index')));
    }
    return index;
}
