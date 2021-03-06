import SeamlessImmutable from 'seamless-immutable';
import { AxiosRequestConfig } from 'axios';

/**
 * Utility Types
 */

export type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;

export type ArrayTwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type UnknownType = Record<string, unknown>;

export type Unpacked<T> = T extends (infer U)[]
  ? U // eslint-disable-next-line @typescript-eslint/no-explicit-any
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

/**
 * Response Types
 */

export type APIResponse = {
  duration: string;
};

export type AppSettingsAPIResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  app?: {
    channel_configs: Record<
      string,
      {
        automod?: ChannelConfigAutomod;
        automod_behavior?: ChannelConfigAutomodBehavior;
        commands?: CommandVariants<CommandType>[];
        connect_events?: boolean;
        created_at?: string;
        max_message_length?: number;
        message_retention?: string;
        mutes?: boolean;
        name?: string;
        reactions?: boolean;
        read_events?: boolean;
        replies?: boolean;
        search?: boolean;
        typing_events?: boolean;
        updated_at?: string;
        uploads?: boolean;
        url_enrichment?: boolean;
      }
    >;
    before_message_send_hook_url?: string;
    custom_command_url?: string;
    disable_auth_checks?: boolean;
    disable_permissions_checks?: boolean;
    multi_tenant_enabled?: boolean;
    name?: string;
    organization?: string;
    permission_version?: string;
    policies?: Record<string, Policy[]>;
    push_notifications?: {
      apn?: APNConfig;
      firebase?: FirebaseConfig;
    };
    suspended?: boolean;
    suspended_explanation?: string;
    user_search_disallowed_roles?: string[];
    webhook_url?: string;
  };
};

export type ChannelResponse<
  ChannelType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = ChannelType & {
  cid: string;
  frozen: boolean;
  id: string;
  type: string;
  config?: ChannelConfigWithInfo<CommandType>;
  created_at?: string;
  created_by?: UserResponse<UserType> | null;
  created_by_id?: string;
  deleted_at?: string;
  invites?: string[];
  last_message_at?: string;
  member_count?: number;
  members?: ChannelMemberResponse<UserType>[];
  muted?: boolean;
  name?: string;
  team?: string;
  updated_at?: string;
};

export type ChannelAPIResponse<
  ChannelType = UnknownType,
  AttachmentType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType, CommandType>;
  members: ChannelMemberResponse<UserType>[];
  messages: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >[];
  hidden?: boolean;
  membership?: ChannelMembership<UserType> | null;
  read?: ReadResponse<UserType>[];
  watcher_count?: number;
  watchers?: UserResponse<UserType>[];
};

export type ChannelMemberAPIResponse<UserType = UnknownType> = APIResponse & {
  members: ChannelMemberResponse<UserType>[];
};

export type UpdateMessageAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  message: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
};

export type ChannelMemberResponse<UserType = UnknownType> = {
  created_at?: string;
  invite_accepted_at?: string;
  invite_rejected_at?: string;
  invited?: boolean;
  is_moderator?: boolean;
  role?: string;
  updated_at?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type CheckPushResponse = APIResponse & {
  device_errors?: {
    error_message?: string;
    provider?: string;
  };
  general_errors?: string[];
  rendered_apn_template?: string;
  rendered_firebase_template?: string;
};

export type CommandResponse<CommandType extends string = LiteralStringForUnion> = {
  args?: string;
  description?: string;
  name?: CommandVariants<CommandType>;
  set?: CommandVariants<CommandType>;
};

export type ConnectAPIResponse<
  ChannelType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = Promise<void | ConnectionOpen<ChannelType, UserType, CommandType>>;

export type CreateChannelResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse &
  Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id'> & {
    created_at: string;
    updated_at: string;
    roles?: Record<string, ChannelRole[]>;
  };

export type DeleteChannelAPIResponse<
  ChannelType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType, CommandType>;
};

export type EventAPIResponse<
  EventType extends UnknownType = UnknownType,
  AttachmentType extends UnknownType = UnknownType,
  ChannelType extends UnknownType = UnknownType,
  MessageType extends UnknownType = UnknownType,
  ReactionType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  event: Event<
    EventType,
    AttachmentType,
    ChannelType,
    MessageType,
    ReactionType,
    UserType,
    CommandType
  >;
};

export type FlagMessageResponse<UserType = UnknownType> = APIResponse & {
  flag: {
    created_at: string;
    created_by_automod: boolean;
    target_message_id: string;
    updated_at: string;
    user: UserResponse<UserType>;
    approved_at?: string;
    rejected_at?: string;
    reviewed_at?: string;
    reviewed_by?: string;
  };
};

export type FlagUserResponse<UserType = UnknownType> = APIResponse & {
  flag: {
    created_at: string;
    created_by_automod: boolean;
    target_user: UserResponse<UserType>;
    updated_at: string;
    user: UserResponse<UserType>;
    approved_at?: string;
    rejected_at?: string;
    reviewed_at?: string;
    reviewed_by?: string;
  };
};

export type GetChannelTypeResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse &
  Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id' | 'commands'> & {
    created_at: string;
    updated_at: string;
    commands?: CommandResponse<CommandType>[];
    roles?: Record<string, ChannelRole[]>;
  };

export type GetMultipleMessagesAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  messages: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >[];
};

export type GetReactionsAPIResponse<
  ReactionType = UnknownType,
  UserType = UnknownType
> = APIResponse & {
  reactions: ReactionResponse<ReactionType, UserType>[];
};

export type GetRepliesAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  messages: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >[];
};

export type ImmutableMessageResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = SeamlessImmutable.Immutable<
  Omit<
    MessageResponse<
      MessageType,
      AttachmentType,
      ChannelType,
      ReactionType,
      UserType,
      CommandType
    >,
    'created_at' | 'updated_at' | 'status'
  > & {
    __html: string;
    created_at: Date;
    status: string;
    updated_at: Date;
  }
>;

export type ListChannelResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  channel_types: Record<
    string,
    Omit<
      CreateChannelOptions<CommandType>,
      'client_id' | 'connection_id' | 'commands'
    > & {
      commands: CommandResponse<CommandType>[];
      created_at: string;
      updated_at: string;
      roles?: Record<string, ChannelRole[]>;
    }
  >;
};

export type MuteChannelAPIResponse<
  ChannelType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  channel_mute: ChannelMute<ChannelType, UserType, CommandType>;
  own_user: OwnUserResponse<ChannelType, UserType, CommandType>;
  channel_mutes?: ChannelMute<ChannelType, UserType, CommandType>[];
  mute?: MuteResponse<UserType>;
};

export type MessageResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = MessageBase<MessageType, AttachmentType, UserType> & {
  args?: string;
  channel?: ChannelResponse<ChannelType, UserType, CommandType>;
  command?: string;
  command_info?: { name?: string };
  created_at?: string;
  deleted_at?: string;
  latest_reactions?: ReactionResponse<ReactionType, UserType>[];
  mentioned_users?: UserResponse<UserType>[];
  own_reactions?: ReactionResponse<ReactionType, UserType>[] | null;
  reaction_counts?: { [key: string]: number } | null;
  reaction_scores?: { [key: string]: number } | null;
  reply_count?: number;
  silent?: boolean;
  status?: string;
  type?: string;
  updated_at?: string;
};

export type MuteResponse<UserType = UnknownType> = {
  user: UserResponse<UserType>;
  created_at?: string;
  target?: UserResponse<UserType>;
  updated_at?: string;
};

export type MuteUserResponse<
  ChannelType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  mute?: MuteResponse<UserType>;
  mutes?: Array<Mute<UserType>>;
  own_user?: OwnUserResponse<ChannelType, UserType, CommandType>;
};

export type OwnUserResponse<
  ChannelType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = UserResponse<UserType> & {
  channel_mutes: ChannelMute<ChannelType, UserType, CommandType>[];
  devices: Device<UserType>[];
  mutes: Mute<UserType>[];
  total_unread_count: number;
  unread_channels: number;
  unread_count: number;
  invisible?: boolean;
  language?: string;
  roles?: string[];
};

export type PermissionAPIResponse = APIResponse & {
  permission?: PermissionAPIObject;
};

export type PermissionsAPIResponse = APIResponse & {
  permissions?: PermissionAPIObject[];
};

export type ReactionAPIResponse<
  ReactionType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  message: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
  reaction: ReactionResponse<ReactionType, UserType>;
};

export type ReactionResponse<
  ReactionType = UnknownType,
  UserType = UnknownType
> = Reaction<ReactionType, UserType> & {
  created_at: string;
  updated_at: string;
};

export type ReadResponse<UserType = UnknownType> = {
  last_read: string;
  user: UserResponse<UserType>;
  unread_messages?: number;
};

export type SearchAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  results: {
    message: MessageResponse<
      MessageType,
      AttachmentType,
      ChannelType,
      ReactionType,
      UserType,
      CommandType
    >;
  }[];
};

export type SendFileAPIResponse = APIResponse & { file: string };

export type SendMessageAPIResponse<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  message: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
};

export type TruncateChannelAPIResponse<
  ChannelType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType, CommandType>;
};

export type UpdateChannelAPIResponse<
  ChannelType = UnknownType,
  AttachmentType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  channel: ChannelResponse<ChannelType, UserType, CommandType>;
  members: ChannelMemberResponse<UserType>[];
  message?: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
};

export type UserResponse<T = UnknownType> = User<T> & {
  banned?: boolean;
  created_at?: string;
  deactivated_at?: string;
  deleted_at?: string;
  last_active?: string;
  online?: boolean;
  updated_at?: string;
};

export type UpdateChannelResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse &
  Omit<CreateChannelOptions<CommandType>, 'client_id' | 'connection_id'> & {
    created_at: string;
    updated_at: string;
  };

/**
 * Option Types
 */

export type BanUserOptions<UserType = UnknownType> = UnBanUserOptions & {
  reason?: string;
  timeout?: number;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type ChannelOptions = {
  last_message_ids?: { [key: string]: string };
  limit?: number;
  message_limit?: number;
  offset?: number;
  presence?: boolean;
  recovery?: boolean;
  state?: boolean;
  watch?: boolean;
};

export type CreateCommandOptions<CommandType extends string = LiteralStringForUnion> = {
  description: string;
  name: CommandVariants<CommandType>;
  args?: string;
  set?: CommandVariants<CommandType>;
};

export type CreateCommandResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & { command: CreateCommandOptions<CommandType> & CreatedAtUpdatedAt };

export type UpdateCommandOptions<CommandType extends string = LiteralStringForUnion> = {
  description: string;
  args?: string;
  set?: CommandVariants<CommandType>;
};

export type UpdateCommandResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  command: UpdateCommandOptions<CommandType> &
    CreatedAtUpdatedAt & {
      name: CommandVariants<CommandType>;
    };
};

export type DeleteCommandResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  name?: CommandVariants<CommandType>;
};

export type GetCommandResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & CreateCommandOptions<CommandType> & CreatedAtUpdatedAt;

export type ListCommandsResponse<
  CommandType extends string = LiteralStringForUnion
> = APIResponse & {
  commands: Array<CreateCommandOptions<CommandType> & CreatedAtUpdatedAt>;
};

export type CreateChannelOptions<CommandType extends string = LiteralStringForUnion> = {
  automod?: ChannelConfigAutomod;
  automod_behavior?: ChannelConfigAutomodBehavior;
  client_id?: string;
  commands?: CommandVariants<CommandType>[];
  connect_events?: boolean;
  connection_id?: string;
  max_message_length?: number;
  message_retention?: string;
  mutes?: boolean;
  name?: string;
  permissions?: PermissionObject[];
  reactions?: boolean;
  read_events?: boolean;
  replies?: boolean;
  search?: boolean;
  typing_events?: boolean;
  uploads?: boolean;
  url_enrichment?: boolean;
};

export type CustomPermissionOptions = {
  name: string;
  resource: Resource;
  condition?: string;
  owner?: boolean;
  same_team?: boolean;
};

export type ChannelQueryOptions<
  ChannelType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = {
  client_id?: string;
  connection_id?: string;
  data?: ChannelResponse<ChannelType, UserType, CommandType>;
  members?: PaginationOptions;
  messages?: PaginationOptions;
  presence?: boolean;
  state?: boolean;
  watch?: boolean;
  watchers?: PaginationOptions;
};

export type FlagMessageOptions<UserType = UnknownType> = {
  client_id?: string;
  connection_id?: string;
  created_by?: string;
  target_message_id?: string;
  target_user_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type InviteOptions<
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = {
  accept_invite?: boolean;
  add_members?: string[];
  add_moderators?: string[];
  client_id?: string;
  connection_id?: string;
  data?: Omit<ChannelResponse<ChannelType, UserType, CommandType>, 'id' | 'cid'>;
  demote_moderators?: string[];
  invites?: string[];
  message?: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
  reject_invite?: boolean;
  remove_members?: string[];
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type MarkAllReadOptions<UserType = UnknownType> = {
  client_id?: string;
  connection_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type MarkReadOptions<UserType = UnknownType> = {
  client_id?: string;
  connection_id?: string;
  message_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type MuteUserOptions<UserType = UnknownType> = {
  client_id?: string;
  connection_id?: string;
  id?: string;
  reason?: string;
  target_user_id?: string;
  timeout?: number;
  type?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type PaginationOptions = {
  id_gt?: string;
  id_gte?: string;
  id_lt?: string;
  id_lte?: string;
  limit?: number;
  offset?: number;
};

export type SearchOptions = {
  limit?: number;
  offset?: number;
};

export type StreamChatOptions = AxiosRequestConfig & {
  browser?: boolean;
  logger?: Logger;
};

export type UnBanUserOptions = {
  client_id?: string;
  connection_id?: string;
  id?: string;
  target_user_id?: string;
  type?: string;
};

export type UpdateChannelOptions<
  CommandType extends string = LiteralStringForUnion
> = Omit<CreateChannelOptions<CommandType>, 'name'> & {
  created_at?: string;
  updated_at?: string;
};

export type UserOptions = {
  limit?: number;
  offset?: number;
  presence?: boolean;
};

/**
 * Event Types
 */

export type ConnectionChangeEvent = {
  type: EventTypes;
  online?: boolean;
};

export type Event<
  EventType extends UnknownType = UnknownType,
  AttachmentType extends UnknownType = UnknownType,
  ChannelType extends UnknownType = UnknownType,
  MessageType extends UnknownType = UnknownType,
  ReactionType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = EventType & {
  type: EventTypes;
  channel?: ChannelResponse<ChannelType, UserType, CommandType>;
  channel_id?: string;
  channel_type?: string;
  cid?: string;
  clear_history?: boolean;
  connection_id?: string;
  created_at?: string;
  me?: OwnUserResponse<ChannelType, UserType, CommandType>;
  member?: ChannelMemberResponse<UserType>;
  message?: MessageResponse<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
  online?: boolean;
  reaction?: ReactionResponse<ReactionType, UserType>;
  received_at?: string | Date;
  unread_count?: number;
  user?: UserResponse<UserType>;
  user_id?: string;
  watcher_count?: number;
};

export type EventHandler<
  EventType extends UnknownType = UnknownType,
  AttachmentType extends UnknownType = UnknownType,
  ChannelType extends UnknownType = UnknownType,
  MessageType extends UnknownType = UnknownType,
  ReactionType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = (
  event: Event<
    EventType,
    AttachmentType,
    ChannelType,
    MessageType,
    ReactionType,
    UserType,
    CommandType
  >,
) => void;

export type EventTypes =
  | 'all'
  | 'user.presence.changed'
  | 'user.watching.start'
  | 'user.watching.stop'
  | 'user.deleted'
  | 'user.updated'
  | 'user.banned'
  | 'user.unbanned'
  | 'typing.start'
  | 'typing.stop'
  | 'message.new'
  | 'message.updated'
  | 'message.deleted'
  | 'message.read'
  | 'reaction.new'
  | 'reaction.deleted'
  | 'reaction.updated'
  | 'member.added'
  | 'member.updated'
  | 'member.removed'
  | 'channel.created'
  | 'channel.updated'
  | 'channel.deleted'
  | 'channel.truncated'
  | 'channel.hidden'
  | 'channel.muted'
  | 'channel.unmuted'
  | 'channel.visible'
  | 'health.check'
  | 'notification.message_new'
  | 'notification.mark_read'
  | 'notification.invited'
  | 'notification.invite_accepted'
  | 'notification.added_to_channel'
  | 'notification.removed_from_channel'
  | 'notification.channel_deleted'
  | 'notification.channel_mutes_updated'
  | 'notification.channel_truncated'
  | 'notification.mutes_updated'
  | 'connection.changed'
  | 'connection.recovered';

/**
 * Filter Types
 */

export type AscDesc = 1 | -1;

export type ChannelFilters<
  ChannelType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = QueryFilters<
  ContainsOperator<ChannelType> & {
    name?:
      | RequireOnlyOne<
          {
            $autocomplete?: ChannelResponse<ChannelType, UserType, CommandType>['name'];
          } & QueryFilter<ChannelResponse<ChannelType, UserType, CommandType>['name']>
        >
      | PrimitiveFilter<ChannelResponse<ChannelType, UserType, CommandType>['name']>;
  } & {
      [Key in keyof Omit<ChannelResponse<{}, UserType, CommandType>, 'name'>]:
        | RequireOnlyOne<QueryFilter<ChannelResponse<{}, UserType, CommandType>[Key]>>
        | PrimitiveFilter<ChannelResponse<{}, UserType, CommandType>[Key]>;
    }
>;

export type ContainsOperator<CustomType = {}> = {
  [Key in keyof CustomType]?: CustomType[Key] extends (infer ContainType)[]
    ?
        | RequireOnlyOne<
            {
              $contains?: ContainType extends object
                ? PrimitiveFilter<RequireAtLeastOne<ContainType>>
                : PrimitiveFilter<ContainType>;
            } & QueryFilter<PrimitiveFilter<ContainType>[]>
          >
        | PrimitiveFilter<PrimitiveFilter<ContainType>[]>
    : RequireOnlyOne<QueryFilter<CustomType[Key]>> | PrimitiveFilter<CustomType[Key]>;
};

export type MessageFilters<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = QueryFilters<
  ContainsOperator<MessageType> & {
    text?:
      | RequireOnlyOne<
          {
            $autocomplete?: MessageResponse<
              MessageType,
              AttachmentType,
              ChannelType,
              ReactionType,
              UserType,
              CommandType
            >['text'];
            $q?: MessageResponse<
              MessageType,
              AttachmentType,
              ChannelType,
              ReactionType,
              UserType,
              CommandType
            >['text'];
          } & QueryFilter<
            MessageResponse<
              MessageType,
              AttachmentType,
              ChannelType,
              ReactionType,
              UserType,
              CommandType
            >['text']
          >
        >
      | PrimitiveFilter<
          MessageResponse<
            MessageType,
            AttachmentType,
            ChannelType,
            ReactionType,
            UserType,
            CommandType
          >['text']
        >;
  } & {
      [Key in keyof Omit<
        MessageResponse<
          {},
          AttachmentType,
          ChannelType,
          ReactionType,
          UserType,
          CommandType
        >,
        'text'
      >]?:
        | RequireOnlyOne<
            QueryFilter<
              MessageResponse<
                {},
                AttachmentType,
                ChannelType,
                ReactionType,
                UserType,
                CommandType
              >[Key]
            >
          >
        | PrimitiveFilter<
            MessageResponse<
              {},
              AttachmentType,
              ChannelType,
              ReactionType,
              UserType,
              CommandType
            >[Key]
          >;
    }
>;

export type PrimitiveFilter<ObjectType> = ObjectType | null;

export type QueryFilter<ObjectType = string> = NonNullable<ObjectType> extends
  | string
  | number
  | boolean
  ? {
      $eq?: PrimitiveFilter<ObjectType>;
      $exists?: boolean;
      $gt?: PrimitiveFilter<ObjectType>;
      $gte?: PrimitiveFilter<ObjectType>;
      $in?: PrimitiveFilter<ObjectType>[];
      $lt?: PrimitiveFilter<ObjectType>;
      $lte?: PrimitiveFilter<ObjectType>;
      $ne?: PrimitiveFilter<ObjectType>;
      $nin?: PrimitiveFilter<ObjectType>[];
    }
  : {
      $eq?: PrimitiveFilter<ObjectType>;
      $exists?: boolean;
      $in?: PrimitiveFilter<ObjectType>[];
      $ne?: PrimitiveFilter<ObjectType>;
      $nin?: PrimitiveFilter<ObjectType>[];
    };

export type QueryFilters<Operators = {}> = {
  [Key in keyof Operators]?: Operators[Key];
} &
  QueryLogicalOperators<Operators>;

export type QueryLogicalOperators<Operators> = {
  $and?: ArrayOneOrMore<QueryFilters<Operators>>;
  $nor?: ArrayOneOrMore<QueryFilters<Operators>>;
  $or?: ArrayTwoOrMore<QueryFilters<Operators>>;
};

export type UserFilters<UserType = UnknownType> = QueryFilters<
  ContainsOperator<UserType> & {
    id?:
      | RequireOnlyOne<
          { $autocomplete?: UserResponse<UserType>['id'] } & QueryFilter<
            UserResponse<UserType>['id']
          >
        >
      | PrimitiveFilter<UserResponse<UserType>['id']>;
    name?:
      | RequireOnlyOne<
          { $autocomplete?: UserResponse<UserType>['name'] } & QueryFilter<
            UserResponse<UserType>['name']
          >
        >
      | PrimitiveFilter<UserResponse<UserType>['name']>;
    teams?:
      | RequireOnlyOne<{
          $contains?: PrimitiveFilter<string>;
          $eq?: PrimitiveFilter<UserResponse<UserType>['teams']>;
        }>
      | PrimitiveFilter<UserResponse<UserType>['teams']>;
    username?:
      | RequireOnlyOne<
          { $autocomplete?: UserResponse<UserType>['username'] } & QueryFilter<
            UserResponse<UserType>['username']
          >
        >
      | PrimitiveFilter<UserResponse<UserType>['username']>;
  } & {
      [Key in keyof Omit<UserResponse<{}>, 'id' | 'name' | 'teams' | 'username'>]?:
        | RequireOnlyOne<QueryFilter<UserResponse<{}>[Key]>>
        | PrimitiveFilter<UserResponse<{}>[Key]>;
    }
>;

/**
 * Sort Types
 */

export type ChannelSort<ChannelType = UnknownType> = Sort<ChannelType> & {
  created_at?: AscDesc;
  has_unread?: AscDesc;
  last_message_at?: AscDesc;
  last_updated?: AscDesc;
  member_count?: AscDesc;
  unread_count?: AscDesc;
  updated_at?: AscDesc;
};

export type Sort<T> = {
  [P in keyof T]?: AscDesc;
};

export type UserSort<UserType = UnknownType> = Sort<UserResponse<UserType>>;

/**
 * Base Types
 */

export type Action = {
  name?: string;
  style?: string;
  text?: string;
  type?: string;
  value?: string;
};

export type AnonUserType = {};

export type APNConfig = {
  auth_type?: string;
  bundle_id?: string;
  development?: boolean;
  enabled?: boolean;
  host?: string;
  key_id?: string;
  notification_template?: string;
  team_id?: string;
};

export type AppSettings = {
  apn_config?: {
    auth_key?: string;
    auth_type?: string;
    bundle_id?: string;
    development?: boolean;
    host?: string;
    key_id?: string;
    notification_template?: string;
    p12_cert?: string;
    team_id?: string;
  };
  disable_auth_checks?: boolean;
  disable_permissions_checks?: boolean;
  firebase_config?: {
    data_template?: string;
    notification_template?: string;
    server_key?: string;
  };
  webhook_url?: string;
};

export type Attachment<T = UnknownType> = T & {
  actions?: Action[];
  asset_url?: string;
  author_icon?: string;
  author_link?: string;
  author_name?: string;
  color?: string;
  fallback?: string;
  fields?: Field[];
  footer?: string;
  footer_icon?: string;
  image_url?: string;
  og_scrape_url?: string;
  pretext?: string;
  text?: string;
  thumb_url?: string;
  title?: string;
  title_link?: string;
  type?: string;
};

export type ChannelConfig<
  CommandType extends string = LiteralStringForUnion
> = ChannelConfigFields &
  CreatedAtUpdatedAt & {
    commands?: CommandVariants<CommandType>[];
  };

export type ChannelConfigAutomod = 'disabled' | 'simple' | 'AI' | '';

export type ChannelConfigAutomodBehavior = 'flag' | 'block' | '';

export type ChannelConfigFields = {
  automod?: ChannelConfigAutomod;
  automod_behavior?: ChannelConfigAutomodBehavior;
  connect_events?: boolean;
  max_message_length?: number;
  message_retention?: string;
  mutes?: boolean;
  name?: string;
  reactions?: boolean;
  read_events?: boolean;
  replies?: boolean;
  search?: boolean;
  typing_events?: boolean;
  uploads?: boolean;
  url_enrichment?: boolean;
};

export type ChannelConfigWithInfo<
  CommandType extends string = LiteralStringForUnion
> = ChannelConfigFields &
  CreatedAtUpdatedAt & {
    commands?: CommandResponse<CommandType>[];
  };

export type ChannelData<ChannelType = UnknownType> = ChannelType & {
  members?: string[];
  name?: string;
};

export type ChannelMembership<UserType = UnknownType> = {
  created_at?: string;
  is_moderator?: boolean;
  role?: string;
  updated_at?: string;
  user?: UserResponse<UserType>;
};

export type ChannelMute<
  ChannelType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = {
  user: UserResponse<UserType>;
  channel?: ChannelResponse<ChannelType, UserType, CommandType>;
  created_at?: string;
  expires?: string;
  updated_at?: string;
};

export type ChannelRole = {
  custom?: boolean;
  name?: string;
  owner?: boolean;
  resource?: string;
  same_team?: boolean;
};

export type CheckPushInput<UserType = UnknownType> = {
  apn_template?: string;
  client_id?: string;
  connection_id?: string;
  firebase_data_template?: string;
  firebase_template?: string;
  message_id?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type CommandVariants<CommandType extends string = LiteralStringForUnion> =
  | 'all'
  | 'fun_set'
  | 'moderation_set'
  | 'giphy'
  | 'imgur'
  | 'flag'
  | 'ban'
  | 'unban'
  | 'mute'
  | 'unmute'
  | CommandType;

export type Configs<CommandType extends string = LiteralStringForUnion> = {
  [channel_type: string]: ChannelConfigWithInfo<CommandType> | undefined;
};

export type ConnectionOpen<
  ChannelType extends UnknownType = UnknownType,
  UserType extends UnknownType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = {
  connection_id: string;
  cid?: string;
  created_at?: string;
  me?: OwnUserResponse<ChannelType, UserType, CommandType>;
  type?: string;
};

export type CreatedAtUpdatedAt = {
  created_at: string;
  updated_at: string;
};

export type Device<UserType = UnknownType> = DeviceFields & {
  provider?: string;
  user?: UserResponse<UserType>;
  user_id?: string;
};

export type DeviceFields = {
  id?: string;
  push_provider?: 'apn' | 'firebase';
};

export type Field = {
  short?: boolean;
  title?: string;
  value?: string;
};

export type FirebaseConfig = {
  data_template?: string;
  enabled?: boolean;
  notification_template?: string;
};

export type LiteralStringForUnion = string & {};

export type Logger = (
  logLevel: 'info' | 'error' | 'warn',
  message: string,
  extraData?: Record<string, unknown>,
) => void;

export type Message<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  UserType = UnknownType
> = MessageBase<MessageType, AttachmentType, UserType> & {
  mentioned_users?: string[];
};

export type MessageBase<
  MessageType = UnknownType,
  AttachmentType = UnknownType,
  UserType = UnknownType
> = MessageType & {
  attachments?: Attachment<AttachmentType>[];
  html?: string;
  id?: string;
  parent_id?: string;
  show_in_channel?: boolean;
  text?: string;
  user?: UserResponse<UserType> | null;
  user_id?: string;
};

export type Mute<UserType = UnknownType> = {
  created_at: string;
  target: UserResponse<UserType>;
  updated_at: string;
  user: UserResponse<UserType>;
};

export type PartialUserUpdate<UserType = UnknownType> = {
  id: string;
  set?: Partial<UserResponse<UserType>>;
  unset?: Array<keyof UserResponse<UserType>>;
};

export type PermissionAPIObject = {
  custom?: boolean;
  name?: string;
  owner?: boolean;
  resource?: Resource;
  same_team?: boolean;
};

export type PermissionObject = {
  action?: 'Deny' | 'Allow';
  name?: string;
  owner?: boolean;
  priority?: number;
  resources?: string[];
  roles?: string[];
};

export type Policy = {
  action?: 0 | 1;
  created_at?: string;
  name?: string;
  owner?: boolean;
  priority?: number;
  resources?: string[];
  roles?: string[];
  updated_at?: string;
};

export type Reaction<
  ReactionType = UnknownType,
  UserType = UnknownType
> = ReactionType & {
  type: string;
  message_id?: string;
  score?: number;
  user?: UserResponse<UserType> | null;
  user_id?: string;
};

export type Resource =
  | 'CreateChannel'
  | 'ReadChannel'
  | 'UpdateChannelMembers'
  | 'UpdateChannel'
  | 'UpdateUser'
  | 'DeleteChannel'
  | 'CreateMessage'
  | 'UpdateMessage'
  | 'DeleteMessage'
  | 'RunMessageAction'
  | 'MuteUser'
  | 'BanUser'
  | 'EditUser'
  | 'UploadAttachment'
  | 'DeleteAttachment'
  | 'AddLinks'
  | 'CreateReaction'
  | 'DeleteReaction';

export type SearchPayload<
  AttachmentType = UnknownType,
  ChannelType = UnknownType,
  MessageType = UnknownType,
  ReactionType = UnknownType,
  UserType = UnknownType,
  CommandType extends string = LiteralStringForUnion
> = SearchOptions & {
  client_id?: string;
  connection_id?: string;
  filter_conditions?: ChannelFilters<ChannelType, UserType, CommandType>;
  message_filter_conditions?: MessageFilters<
    MessageType,
    AttachmentType,
    ChannelType,
    ReactionType,
    UserType,
    CommandType
  >;
  query?: string;
};

export type TestPushDataInput = {
  apnTemplate?: string;
  firebaseDataTemplate?: string;
  firebaseTemplate?: string;
  messageID?: string;
};

export type TokenOrProvider = string | TokenProvider | null | undefined;

export type TokenProvider = () => Promise<string>;

export type User<T = UnknownType> = T & {
  id: string;
  anon?: boolean;
  name?: string;
  role?: string;
  teams?: string[];
  username?: string;
};

export type TypingStartEvent = Event;
