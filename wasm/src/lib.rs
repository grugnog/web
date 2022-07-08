extern crate serde;
extern crate console_error_panic_hook;

/// base generic domain structures.
pub mod structures;
use hashbrown::HashMap;
use wasm_bindgen::prelude::*;
use crate::structures::website::{PageIssue};

#[derive(Default)]
#[wasm_bindgen]
pub struct Feed {
    /// is the feed open?
    pub open: bool,
    /// data mapping hashmap of website by domain with hashmap of urls
    data: HashMap<String, HashMap<String, PageIssue>>,
}

/// feed of high interval data processing websites.
#[wasm_bindgen]
impl Feed {
    // start a new feed
    pub fn new() -> Feed {
        console_error_panic_hook::set_once();
 
        Default::default()
    }
    /// get a single website from the hashmap of hashmaps
    pub fn get_website(&self, website: JsValue) -> JsValue {
        let website: PageIssue = website.into_serde().unwrap();
        let domain = website.domain;

        if self.data.contains_key(&domain) {
            let value = self.data.get(&domain).unwrap();
            let value = value.get(&website.page_url).unwrap();

            JsValue::from_serde(&value).unwrap()
        } else {
           JsValue::from_serde(&false).unwrap()
        }
    }
    /// insert a website into hashmap
    pub fn insert_website(&mut self, website: JsValue) {
        let website: PageIssue = website.into_serde().unwrap();
        let mut page = HashMap::new();

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
    /// get data
    pub fn get_data(&mut self) -> JsValue {
        JsValue::from_serde(&self.data).unwrap()
    }
    /// get website collections list into vector
    pub fn get_data_item(&self, search: String, all: bool) -> JsValue {
        if !all && self.data.contains_key(&search) {
            let items = &self.data.get(&search).unwrap();
            let items = items.values().cloned().collect::<Vec<PageIssue>>();

            JsValue::from_serde(&items).unwrap()
        } else if all {
            let mut items = HashMap::new();
            for (key, value) in self.data.clone().iter() {
                if key.contains(&search) {
                    items.extend(value.to_owned());
                    break;
                }
            };
            let items = items.values().cloned().collect::<Vec<PageIssue>>();

            JsValue::from_serde(&items).unwrap()
        } else {
            let items: Vec<PageIssue> = Vec::new();
            JsValue::from_serde(&items).unwrap()
        }
    }
    /// clear data from feed 
    pub fn clear_data(&mut self) {
        self.data.clear();
    }
}