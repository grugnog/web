use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, Default, Eq, Hash, PartialEq)]
pub struct Issue {
    pub code: String,
    pub context: String,
    pub message: String,
    pub recurrence: i32,
    pub selector: String,
    #[serde(rename = "type")]
    pub issue_type: String,
    // #[serde(rename = "typeCode")]
    // pub type_code: i32,
    // pub runner: String,
}
