extern crate serde;
pub mod structures;

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