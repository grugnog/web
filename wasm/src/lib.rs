extern crate serde;
extern crate console_error_panic_hook;
extern crate serde_wasm_bindgen;
extern crate indexmap;

/// base generic domain structures.
pub mod structures;
use indexmap::{IndexMap};

use wasm_bindgen::prelude::*;
use crate::structures::website::{PageIssue};
use serde::{Serialize, Deserialize};

#[derive(Default, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Feed {
    /// is the feed open?
    pub open: bool,
    /// data mapping hashmap of website by domain with hashmap of urls
    #[serde(with = "indexmap::serde_seq")]
    data: IndexMap<String, IndexMap<String, PageIssue>>,
}

/// feed of high interval data processing websites.
#[wasm_bindgen]
impl Feed {
    // start a new feed
    pub fn new() -> Feed {
        console_error_panic_hook::set_once();
 
        Default::default()
    }

    /// insert a website into hashmap
    pub fn insert_website(&mut self, website: JsValue) {
        let website: PageIssue = serde_wasm_bindgen::from_value(website).unwrap();
        let mut page = IndexMap::new();

        let domain = website.domain.clone();
        let page_url = website.page_url.clone();

        page.insert(page_url, website);

        if !self.data.contains_key(&domain) {
            self.data.insert(domain, page);
        } else {
            let mut value = self.data.get(&domain).unwrap().to_owned();

            value.extend(page.to_owned());

            self.data.insert(domain, value);
        }
    }

    /// get a single website from the hashmap of hashmaps
    pub fn get_website(&self, domain: String) -> JsValue {
        if self.data.contains_key(&domain) {
            let value = self.data.get(&domain).unwrap();

            serde_wasm_bindgen::to_value(&value).unwrap()
        } else {
            serde_wasm_bindgen::to_value(&false).unwrap()
        }
    }

    /// get a single website list of pages
    pub fn get_page(&self, domain: String, page_url: String) -> JsValue {
        if self.data.contains_key(&domain) {
            let value = self.data.get(&domain).unwrap();
            let value = value.get(&page_url).unwrap();

            serde_wasm_bindgen::to_value(&value).unwrap()
        } else {
            serde_wasm_bindgen::to_value(&false).unwrap()
        }
    }

    /// get data
    pub fn get_data(&mut self) -> JsValue {
        serde_wasm_bindgen::to_value(&self.data).unwrap()
    }

    /// website keys
    pub fn get_website_keys(&self, domain: String) -> JsValue {
        if self.data.contains_key(&domain) {
            let value = self.data.get(&domain).unwrap();
            let keys: Vec<&String> = value.keys().collect();

            serde_wasm_bindgen::to_value(&keys).unwrap()
        } else {
            let v: Vec<&String> = vec![];

            serde_wasm_bindgen::to_value(&v).unwrap()
        }
    }

    /// get data keys
    pub fn get_data_keys(&mut self) -> JsValue {
        let keys: Vec<&String> = self.data.keys().collect();

        serde_wasm_bindgen::to_value(&keys).unwrap()
    }

    /// get website collections list into vector
    pub fn get_data_item(&self, search: String, all: bool) -> JsValue {
        if !all && self.data.contains_key(&search) {
            let items = &self.data.get(&search).unwrap();
            let items = items.values().collect::<Vec<&PageIssue>>();

            serde_wasm_bindgen::to_value(&items).unwrap()
        } else if all {
            let mut items = IndexMap::new();
            for (key, value) in self.data.clone().iter() {
                if key.contains(&search) {
                    items.extend(value.to_owned());
                    break;
                }
            };
            let items = items.values().collect::<Vec<&PageIssue>>();

            serde_wasm_bindgen::to_value(&items).unwrap()
        } else {
            let items: Vec<PageIssue> = Vec::new();
            serde_wasm_bindgen::to_value(&items).unwrap()
        }
    }
    
    /// sort the data
    pub fn sort_website(&mut self, domain: String) {
        if self.data.contains_key(&domain) {
            let value = self.data.get(&domain).unwrap();
            let mut v = value.clone();
            v.sort_keys();
            self.data.insert(domain, v);
        }
    }

    /// clear data from feed 
    pub fn clear_data(&mut self) {
        self.data.clear();
    }
}