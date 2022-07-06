extern crate serde;

/// base generic domain structures.
pub mod structures;

use std::collections::HashMap;

use wasm_bindgen::prelude::*;
use crate::structures::website::{Website};

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

/// test handle data structure object
#[wasm_bindgen]
pub fn webhandle() -> JsValue {
    let website = Website::default();

    JsValue::from_serde(&website).unwrap()
}

#[wasm_bindgen]
#[derive(Default)]
pub struct Feed {
    /// is the feed open?
    pub open: bool,
    /// data mapping hasmap of website by domain with hashmap of urls
    data: HashMap<String, HashMap<String, Website>>,
}

/// feed of high interval data processing websites.
#[wasm_bindgen]
impl Feed {
    // start a new feed
    pub fn new() -> Feed {
        Default::default()
    }
    /// get a single website from the hashmap
    pub fn get_website(&self, website: JsValue) -> JsValue {
        let website: Website = website.into_serde().unwrap();
        let domain = website.domain;

        if self.data.contains_key(&domain) {
            let value = self.data.get(&domain).unwrap();
            let value = value.get(&website.url).unwrap();

            JsValue::from_serde(&value).unwrap()
        } else {
           JsValue::from_serde(&false).unwrap()
        }
    }
    /// insert a website into hashmap
    pub fn insert_website(&mut self, website: JsValue) -> JsValue {
        let website: Website = website.into_serde().unwrap();
        let domain = &website.domain;
        let mut page = HashMap::new();
        page.insert(website.url.to_owned(), website.clone());

        if !self.data.contains_key(domain) {
            self.data.insert(domain.to_owned(), page).unwrap();
            
            JsValue::from_serde(&true).unwrap()
        } else {
            let mut value = self.data.get(domain).unwrap().to_owned();
            let url = website.url.to_string();

            value.insert(url, website.clone()).unwrap();

            JsValue::from_serde(&true).unwrap()
        }
    }
}
