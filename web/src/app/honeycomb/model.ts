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
    PressEvent: PressReleaseEvent[];
    ReleaseEvent: PressReleaseEvent[];
}

export interface PressReleaseEvent {
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
    VariableBoundaries: VariableBoundaries;
    Condition: string;
    ConditionValue: string;
    ConditionIsCustom: boolean;
}

export interface Led {
    ByteIndex: number;
    BitIndex: number;
    ConditionLogic: string;
    Conditions: LedCondition[];
}

export interface LedCondition {
    Condition: string;
    ConditionValue: string;
    ConditionIsCustom: boolean;
}

export interface ConfiguratorSettings {
    device: string;
}
