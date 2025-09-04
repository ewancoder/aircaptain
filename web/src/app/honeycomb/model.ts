export interface Root {
    version: string;
    profiles: Profile[];
}

export interface Profile {
    Version: number;
    SaveName: string;
    Data: Daum[];
    LEDs: Led[];
    ConfiguratorSettings: ConfiguratorSettings;
}

export interface Daum {
    ButtonNumber: number;
    PressEvent: PressEvent[];
    ReleaseEvent: ReleaseEvent[];
}

export interface PressEvent {
    Variables: Variable[];
    Variable: string;
    Value: string;
    Name: string;
    Condition: string;
    ConditionValue: string;
    ConditionLogic: string;
    Conditions: Condition[];
    Repeat: number;
}

export interface Variable {
    Variable: string;
    Value: string;
    VariableIsCustom: boolean;
    VariableBoundaries: VariableBoundaries;
}

export interface VariableBoundaries {
    MinValue: string;
    MaxValue: string;
    Clamp: boolean;
}

export interface Condition {
    Variable: string;
    Value: string;
    VariableIsCustom: boolean;
    VariableBoundaries: VariableBoundaries2;
    Condition: string;
    ConditionValue: string;
    ConditionIsCustom: boolean;
}

export interface VariableBoundaries2 {
    MinValue: string;
    MaxValue: string;
    Clamp: boolean;
}

export interface ReleaseEvent {
    Variables: Variable2[];
    Variable: string;
    Value: string;
    Name: string;
    Condition: string;
    ConditionValue: string;
    ConditionLogic: string;
    Conditions: Condition2[];
    Repeat: number;
}

export interface Variable2 {
    Variable: string;
    Value: string;
    VariableIsCustom: boolean;
    VariableBoundaries: VariableBoundaries3;
}

export interface VariableBoundaries3 {
    MinValue: string;
    MaxValue: string;
    Clamp: boolean;
}

export interface Condition2 {
    Variable: string;
    Value: string;
    VariableIsCustom: boolean;
    VariableBoundaries: VariableBoundaries4;
    Condition: string;
    ConditionValue: string;
    ConditionIsCustom: boolean;
}

export interface VariableBoundaries4 {
    MinValue: string;
    MaxValue: string;
    Clamp: boolean;
}

export interface Led {
    ByteIndex: number;
    BitIndex: number;
    ConditionLogic: string;
    Conditions: Condition3[];
}

export interface Condition3 {
    Condition: string;
    ConditionValue: string;
    ConditionIsCustom: boolean;
}

export interface ConfiguratorSettings {
    device: string;
}
